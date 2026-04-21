import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { api } from "../../../../services/api";

// Dados mockados do usuário logado (depois virão do Contexto de Autenticação)
const ALUNO_ID = "69e5a714881701b1b1318e8d";
const ALUNO_NOME = "Estagiário Teste";

interface AtividadeBanco {
  _id: string;
  dataAtividade: string;
  horas: number;
}

export const Relatorios = () => {
  const [openModal, setOpenModal] = useState(false);
  const [mesReferencia, setMesReferencia] = useState(""); // Vem no formato YYYY-MM
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState({ texto: "", tipo: "info" as "success" | "error" | "info" });

  const handleGerarRelatorio = async () => {
    if (!mesReferencia) return;
    setLoading(true);
    setMensagem({ texto: "Buscando atividades e processando...", tipo: "info" });

    try {
      // 1. Extrai o Mês e Ano selecionados
      const [anoStr, mesStr] = mesReferencia.split("-");
      const anoSelecionado = parseInt(anoStr);
      const mesSelecionado = parseInt(mesStr); // Ex: 4 (Abril)
      const mesFormatado = `${mesStr}/${anoStr}`; // Para salvar no banco como "04/2026"

      // 2. Busca TODAS as atividades do aluno
      const respostaAtividades = await api.get(`/api/v1/atividades/aluno/${ALUNO_ID}`);
      const todasAtividades = respostaAtividades.data;

      // 3. O FILTRO: Pega só as atividades que aconteceram naquele mês/ano específico
      const atividadesDoMes = todasAtividades.filter((ativ: AtividadeBanco) => {
        const dataAtiv = new Date(ativ.dataAtividade);
        // O JavaScript conta meses de 0 a 11, por isso somamos 1
        return dataAtiv.getUTCMonth() + 1 === mesSelecionado && dataAtiv.getUTCFullYear() === anoSelecionado;
      });

      // 4. Validação de Segurança
      if (atividadesDoMes.length === 0) {
        setMensagem({ texto: `Nenhuma atividade encontrada para ${mesFormatado}.`, tipo: "error" });
        setLoading(false);
        return;
      }

      // 5. A MATEMÁTICA: Soma as horas e pega apenas os IDs (Chaves Estrangeiras)
      const totalHorasCalculado = atividadesDoMes.reduce(
        (acc: number, ativ: AtividadeBanco) => acc + (ativ.horas || 0),
        0,
      );
      const arrayDeIds = atividadesDoMes.map((ativ: AtividadeBanco) => ativ._id);

      // 6. O POST FINAL: Envia o pacote para o seu Back-end!
      await api.post("/api/v1/relatorios", {
        alunoId: ALUNO_ID,
        aluno: ALUNO_NOME,
        mesReferencia: mesFormatado,
        atividades: arrayDeIds, // Mandamos a lista de IDs para o Mongoose!
        horasRealizadas: totalHorasCalculado,
        status: "Pendente",
      });

      setMensagem({ texto: "Relatório gerado e enviado com sucesso!", tipo: "success" });

      // Fecha o modal após 2 segundos
      setTimeout(() => {
        setOpenModal(false);
        setMensagem({ texto: "", tipo: "info" });
      }, 2000);
    } catch (error) {
      console.error(error);
      setMensagem({ texto: "Erro ao gerar o relatório. Verifique o console.", tipo: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1400, mx: "auto" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h5" fontWeight="bold" color="text.primary">
            Meus Relatórios
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Gere relatórios mensais para aprovação da empresa.
          </Typography>
        </Box>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setOpenModal(true)}>
          Gerar Relatório Mensal
        </Button>
      </Stack>

      {/* ÁREA FUTURA DA TABELA DE RELATÓRIOS */}
      <Box
        sx={{
          mt: 3,
          height: "300px",
          border: "2px dashed #ccc",
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Typography color="text.secondary">A tabela com os seus relatórios gerados aparecerá aqui!</Typography>
      </Box>

      {/* MODAL MÁGICO (DIALOG) */}
      <Dialog open={openModal} onClose={() => !loading && setOpenModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight="bold">Gerar Relatório Mensal</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 3 }}>
            Selecione o mês desejado. O sistema agrupará automaticamente todas as suas atividades deste período e
            calculará as horas.
          </Typography>

          <TextField
            fullWidth
            type="month"
            label="Mês de Referência"
            InputLabelProps={{ shrink: true }}
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
          <Button onClick={() => setOpenModal(false)} color="inherit" disabled={loading}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleGerarRelatorio} disabled={!mesReferencia || loading}>
            {loading ? "Processando..." : "Confirmar e Gerar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
