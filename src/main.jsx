import { render } from "preact";
import { App } from "./App.jsx";

render(<App />, document.getElementById("app"));

// The controller stays isolated while the UI is migrated component by component.
// It is loaded only after Preact has created every DOM target it manages.
if (!window.__censorStationControllerLoaded) {
  window.__censorStationControllerLoaded = true;
  const controller = document.createElement("script");
  controller.src = "/app.js";
  controller.async = false;
  document.body.append(controller);
}
