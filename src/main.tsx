// Importing react related modules
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Importing styles
import "./index.css";

import { App } from "./App.tsx";

// Verifying if the root element exists
const rootElement =
	document.getElementById("root") ?? document.createElement("div");

createRoot(rootElement).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
