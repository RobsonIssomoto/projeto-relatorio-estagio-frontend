import { useState } from "react";
import { isAxiosError } from "axios";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, Alert } from "@mui/material";
import { api } from "../../../../../services/api";

interface IModalGerarRelatorio {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void; // Função para atualizar a lista de relatórios no componente pai
  alunoId: string;
  alunoNome: string;
}

export const ModalGerarRelatorio = ({ open, onClose, onSuccess, alunoId, alunoNome }: IModalGerarRelatorio) => {
  const [mesReferencia, setMesReferencia] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState({ texto: "", tipo: "success" as "success" | "error" });

  const handleGerarRelatorio = async () => {
    setLoading(true);
    setMensagem({ texto: "", tipo: "success" });

    try {
      await api.post("/api/v1/relatorios", {
        alunoId,
        aluno: alunoNome,
        mesReferencia,
      });

      setMensagem({ texto: "Relatório gerado com sucesso!", tipo: "success" });

      // Delay suave para o usuário ver o sucesso antes de fechar
      setTimeout(() => {
        onSuccess(); // Avisa o pai para recarregar a tabela
        onClose(); // Fecha o modal
        setMesReferencia("");
        setMensagem({ texto: "", tipo: "success" });
      }, 1500);
    } catch (error: unknown) {
      let erroMsg = "Erro ao gerar relatório.";

      if (isAxiosError(error) && error.response) {
        erroMsg = error.response.data.message || erroMsg;
        setMensagem({ texto: erroMsg, tipo: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => !loading && onClose()} maxWidth="sm" fullWidth>
      <DialogTitle fontWeight="bold">Gerar Relatório Mensal</DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ mb: 3 }}>
          Selecione o mês desejado. O sistema agrupará automaticamente todas as suas atividades deste período.
        </Typography>
        <TextField
          fullWidth
          type="month"
          label="Mês de Referência"
          slotProps={{ inputLabel: { shrink: true } }}
          value={mesReferencia}
          onChange={(e) => setMesReferencia(e.target.value)}
          disabled={loading}
        />
        {mensagem.texto && (
          <Alert severity={mensagem.tipo} sx={{ mt: 2 }}>
            {mensagem.texto}
          </Alert>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} color="inherit" disabled={loading}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleGerarRelatorio} disabled={!mesReferencia || loading}>
          {loading ? "Processando..." : "Gerar Relatório"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
