"""Compatibility entry point. The detector now lives in ``tools.python``."""

from python.detector_worker import main


if __name__ == "__main__":
    raise SystemExit(main())
