import * as React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import type { SnackbarCloseReason } from "@mui/material/Snackbar";

// 1. Define o que o Alerta precisa receber de fora para funcionar
interface Props {
  open: boolean;
  mensagem: string;
  tipo: "success" | "error" | "warning" | "info";
  onClose: () => void;
}

export default function AlertaFeedback({ open, mensagem, tipo, onClose }: Props) {
  // 2. A função de fechar continua aqui para lidar com o "clique fora"
  const handleClose = (event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }
    // Avisa o "pai" que o alerta precisa fechar
    onClose();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
      {/* O Alert usa o tipo e a mensagem dinamicamente */}
      <Alert onClose={handleClose} severity={tipo} variant="filled" sx={{ width: "100%" }}>
        {mensagem}
      </Alert>
    </Snackbar>
  );
}
