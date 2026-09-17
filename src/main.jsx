import { render } from "preact";
import { App } from "./App.jsx";
import { createZip } from "./browserArchive.js";
import { createWebDetector } from "./webDetector.js";

render(<App />, document.getElementById("app"));

// The controller remains legacy JavaScript for now, but receives the browser
// detector from the bundled application so desktop and web share the same UI.
window.__censorStationWebDetector = createWebDetector();
window.__censorStationArchive = { createZip };

// The controller stays isolated while the UI is migrated component by component.
// It is loaded only after Preact has created every DOM target it manages.
if (!window.__censorStationControllerLoaded) {
  window.__censorStationControllerLoaded = true;
  const controller = document.createElement("script");
  controller.src = "/app.js";
  controller.async = false;
  document.body.append(controller);
}
