import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import theme from "./theme/theme.js";
import { CssBaseline, CssVarsProvider } from "@mui/joy";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<CssVarsProvider theme={theme} defaultMode="system" modeStorageKey="preferred-mode">
			<CssBaseline />
			<App />
		</CssVarsProvider>
	</React.StrictMode>
);
