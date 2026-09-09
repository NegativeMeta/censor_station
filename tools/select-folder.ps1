param([switch]$ValidateOnly)

Add-Type -AssemblyName System.Windows.Forms

Add-Type -TypeDefinition @'
using System;
using System.Runtime.InteropServices;

[ComImport, Guid("DC1C5A9C-E88A-4DDE-A5A1-60F82A20AEF7")]
internal class FileOpenDialogClass { }

[ComImport, InterfaceType(ComInterfaceType.InterfaceIsIUnknown), Guid("42F85136-DB7E-439C-85F1-E4075D135FC8")]
internal interface IFileDialog {
    [PreserveSig] int Show(IntPtr parent);
    void SetFileTypes(uint count, IntPtr filters);
    void SetFileTypeIndex(uint index);
    void GetFileTypeIndex(out uint index);
    void Advise(IntPtr events, out uint cookie);
    void Unadvise(uint cookie);
    void SetOptions(uint options);
    void GetOptions(out uint options);
    void SetDefaultFolder(IShellItem folder);
    void SetFolder(IShellItem folder);
    void GetFolder(out IShellItem folder);
    void GetCurrentSelection(out IShellItem item);
    void SetFileName([MarshalAs(UnmanagedType.LPWStr)] string name);
    void GetFileName([MarshalAs(UnmanagedType.LPWStr)] out string name);
    void SetTitle([MarshalAs(UnmanagedType.LPWStr)] string title);
    void SetOkButtonLabel([MarshalAs(UnmanagedType.LPWStr)] string text);
    void SetFileNameLabel([MarshalAs(UnmanagedType.LPWStr)] string label);
    void GetResult(out IShellItem item);
    void AddPlace(IShellItem item, uint alignment);
    void SetDefaultExtension([MarshalAs(UnmanagedType.LPWStr)] string extension);
    void Close(int result);
    void SetClientGuid(ref Guid guid);
    void ClearClientData();
    void SetFilter(IntPtr filter);
}

[ComImport, InterfaceType(ComInterfaceType.InterfaceIsIUnknown), Guid("43826D1E-E718-42EE-BC55-A1E261C37BFE")]
internal interface IShellItem {
    void BindToHandler(IntPtr bindContext, ref Guid handler, ref Guid interfaceId, out IntPtr result);
    void GetParent(out IShellItem parent);
    void GetDisplayName(uint displayName, out IntPtr name);
    void GetAttributes(uint mask, out uint attributes);
    void Compare(IShellItem other, uint hint, out int order);
}

public static class CensorStationFolderPicker {
    public static string Pick(IntPtr owner) {
        IFileDialog dialog = (IFileDialog)new FileOpenDialogClass();
        try {
            uint options;
            dialog.GetOptions(out options);
            dialog.SetOptions(options | 0x20u | 0x40u | 0x800u | 0x02000000u);
            dialog.SetTitle("Censor Station - Select folder");
            dialog.SetOkButtonLabel("Select folder");
            int result = dialog.Show(owner);
            if (result == unchecked((int)0x800704C7)) return null;
            if (result != 0) Marshal.ThrowExceptionForHR(result);
            IShellItem item;
            dialog.GetResult(out item);
            try {
                IntPtr value;
                item.GetDisplayName(0x80058000u, out value);
                try { return Marshal.PtrToStringUni(value); }
                finally { Marshal.FreeCoTaskMem(value); }
            } finally { Marshal.FinalReleaseComObject(item); }
        } finally { Marshal.FinalReleaseComObject(dialog); }
    }
}
'@

if ($ValidateOnly) { exit 0 }

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$owner = New-Object System.Windows.Forms.Form
$owner.Text = 'Censor Station'
$owner.Width = 1
$owner.Height = 1
$owner.ShowInTaskbar = $false
$owner.FormBorderStyle = [System.Windows.Forms.FormBorderStyle]::None
$owner.StartPosition = [System.Windows.Forms.FormStartPosition]::CenterScreen
$owner.Opacity = 0.01
$owner.TopMost = $true
try {
    $owner.Show()
    $owner.Activate()
    $owner.BringToFront()
    $selected = [CensorStationFolderPicker]::Pick($owner.Handle)
    if ($selected) { [Console]::Write($selected) }
} finally {
    $owner.Close()
    $owner.Dispose()
}
