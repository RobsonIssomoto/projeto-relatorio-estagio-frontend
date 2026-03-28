import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import Button from "@mui/material/Button";
import DrawerAppBar from "./components/DrawerAppBar";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />

    <DrawerAppBar />
  </StrictMode>,
);
