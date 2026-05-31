import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import { api } from "../../../../../services/api"; // Ajuste o caminho da API conforme necessário

interface ModalDevolucaoProps {
  open: boolean;
  onClose: () => void;
  relatorioId: string | null;
  onSuccess: () => void;
}

export const ModalDevolucao = ({ open, onClose, relatorioId, onSuccess }: ModalDevolucaoProps) => {
  const [observacao, setObservacao] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDevolver = async () => {
    if (!relatorioId || !observacao.trim()) return;

    setIsSubmitting(true);
    try {
      await api.put(`/api/relatorios/${relatorioId}/avaliar`, {
        status: "Devolvido",
        observacao: observacao.trim(),
      });
      onSuccess(); // Atualiza a tabela do supervisor
      handleClose(); // Limpa e fecha o modal
    } catch (erro) {
      console.error("Erro ao devolver relatório:", erro);
      alert("Erro ao processar devolução. Verifique a conexão e tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setObservacao(""); // Limpa o texto ao fechar
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ color: "error.main", fontWeight: "bold" }}>Devolver Relatório para Correção</DialogTitle>

      <DialogContent>
        <DialogContentText mb={2}>
          Por favor, detalhe o motivo da devolução. O estagiário receberá este feedback para realizar os ajustes
          necessários antes de enviar novamente.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Motivo da Devolução / Observações"
          type="text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={observacao}
          onChange={(e) => setObservacao(e.target.value)}
          disabled={isSubmitting}
          required
        />
      </DialogContent>

      <DialogActions sx={{ p: 2, pt: 0 }}>
        <Button onClick={handleClose} color="inherit" disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button
          onClick={handleDevolver}
          color="error"
          variant="contained"
          disabled={isSubmitting || !observacao.trim()} // Bloqueia se estiver vazio
          startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}>
          Confirmar Devolução
        </Button>
      </DialogActions>
    </Dialog>
  );
};
