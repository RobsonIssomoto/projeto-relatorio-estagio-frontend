import { useState, useEffect, useMemo } from "react";
import { api } from "../../../../services/api";
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
  Chip,
  Fab,
  IconButton,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import { ptBR } from "@mui/x-data-grid/locales";

const ALUNO_ID = "69e5a714881701b1b1318e8d";
const ALUNO_NOME = "Estagiário Teste";

// 1. Tipagem para a Tabela
interface AtividadeBanco {
  _id: string;
  dataAtividade: string;
  horas: number;
}

interface RelatorioBanco {
  _id: string;
  mesReferencia: string;
  horasRealizadas: number;
  status: "Pendente" | "Aprovado" | "Revisar";
  createdAt: string;
  alunoId: string;
  atividades: string[];
  observacaoSupervisor?: string;
}

export const Relatorios = () => {
  const [openModal, setOpenModal] = useState(false);
  const [mesReferencia, setMesReferencia] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState({ texto: "", tipo: "info" as "success" | "error" | "info" });

  // 2. Novos Estados para a Tabela
  const [relatorios, setRelatorios] = useState<RelatorioBanco[]>([]);
  const [loadingTable, setLoadingTable] = useState(true);

  // 3. Função que busca os relatórios no Back-end
  const buscarRelatorios = async () => {
    setLoadingTable(true);
    try {
      const resposta = await api.get("/api/v1/relatorios");
      // Como a API traz todos, filtraapenas os deste aluno (MVP)
      const meusRelatorios = resposta.data.filter((r: RelatorioBanco) => r.alunoId === ALUNO_ID);
      setRelatorios(meusRelatorios);
    } catch (error) {
      console.error("Erro ao buscar relatórios:", error);
    } finally {
      setLoadingTable(false);
    }
  };

  // Roda a busca assim que a tela abre
  useEffect(() => {
    buscarRelatorios();
  }, []);

  const handleGerarRelatorio = async () => {
    if (!mesReferencia) return;
    setLoading(true);
    setMensagem({ texto: "Buscando atividades e processando...", tipo: "info" });

    try {
      const [anoStr, mesStr] = mesReferencia.split("-");
      const anoSelecionado = parseInt(anoStr);
      const mesSelecionado = parseInt(mesStr);
      const mesFormatado = `${mesStr}/${anoStr}`;

      // ==========================================
      // NOVA REGRA DE NEGÓCIO: Bloqueia duplicatas
      // ==========================================
      const relatorioJaExiste = relatorios.some((r) => r.mesReferencia === mesFormatado);
      if (relatorioJaExiste) {
        setMensagem({
          texto: `Você já gerou um relatório para ${mesFormatado}. Exclua o existente se desejar gerar um novo.`,
          tipo: "error",
        });
        setLoading(false);
        return; // Para a execução aqui!
      }
      // ==========================================

      const respostaAtividades = await api.get(`/api/v1/atividades/aluno/${ALUNO_ID}`);
      const todasAtividades: AtividadeBanco[] = respostaAtividades.data;

      const atividadesDoMes = todasAtividades.filter((ativ: AtividadeBanco) => {
        const dataAtiv = new Date(ativ.dataAtividade);
        return dataAtiv.getUTCMonth() + 1 === mesSelecionado && dataAtiv.getUTCFullYear() === anoSelecionado;
      });

      if (atividadesDoMes.length === 0) {
        setMensagem({ texto: `Nenhuma atividade encontrada para ${mesFormatado}.`, tipo: "error" });
        setLoading(false);
        return;
      }

      const totalHorasCalculado = atividadesDoMes.reduce(
        (acc: number, ativ: AtividadeBanco) => acc + (ativ.horas || 0),
        0,
      );
      const arrayDeIds = atividadesDoMes.map((ativ: AtividadeBanco) => ativ._id);

      await api.post("/api/v1/relatorios", {
        alunoId: ALUNO_ID,
        aluno: ALUNO_NOME,
        mesReferencia: mesFormatado,
        atividades: arrayDeIds,
        horasRealizadas: totalHorasCalculado,
        status: "Pendente",
      });

      setMensagem({ texto: "Relatório gerado e enviado com sucesso!", tipo: "success" });

      // Atualiza a tabela na mesma hora!
      buscarRelatorios();

      setTimeout(() => {
        setOpenModal(false);
        setMensagem({ texto: "", tipo: "info" });
        setMesReferencia(""); // Limpa o input
      }, 1000);
    } catch (error) {
      console.error(error);
      setMensagem({ texto: "Erro ao gerar o relatório.", tipo: "error" });
    } finally {
      setLoading(false);
    }
  };
  // Função para deletar relatório
  const handleDeleteRelatorio = async (id: string) => {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este relatório? Ele voltará a ser apenas atividades soltas.",
    );
    if (!confirmar) return;

    try {
      setLoadingTable(true);
      await api.delete(`/api/v1/relatorios/${id}`);
      // Atualiza a tabela tirando o relatório apagado
      setRelatorios((prev) => prev.filter((r) => r._id !== id));
    } catch (error) {
      console.error("Erro ao deletar relatório:", error);
      alert("Erro ao excluir relatório.");
      setLoadingTable(false); // Só desliga se der erro, se der sucesso a tabela já atualizou
    } finally {
      // Desliga o carregamento ao final da operação
      setLoadingTable(false);
    }
  };
  // 4. Definição das Colunas da Tabela

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "mesReferencia",
        headerName: "Mês/Ano",
        flex: 1,
        minWidth: 120, // Flex divide o espaço
        align: "left",
        headerAlign: "left",
        renderCell: (params) => (
          <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
            <Typography fontWeight="bold" color="text.primary">
              {params.value}
            </Typography>
          </Box>
        ),
      },
      {
        field: "qtdAtividades",
        headerName: "Qtd. Atividades",
        flex: 1,
        minWidth: 130, // Flex divide o espaço
        align: "center",
        headerAlign: "center",
        renderCell: (params) => (
          // O Box garante o alinhamento perfeito no meio da célula
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
            <Typography variant="body2" color="text.secondary" fontWeight="500">
              {params.row.atividades?.length || 0} tarefas
            </Typography>
          </Box>
        ),
      },
      {
        field: "horasRealizadas",
        headerName: "Total de Horas",
        flex: 1,
        minWidth: 130,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => (
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
            <Chip label={`${params.value}h`} variant="outlined" size="small" sx={{ fontWeight: "bold" }} />
          </Box>
        ),
      },
      {
        field: "createdAt",
        headerName: "Data de Envio",
        flex: 1,
        minWidth: 130,
        align: "center",
        headerAlign: "center",
        valueFormatter: (value?: string) => {
          if (!value) return "";
          return new Date(value).toLocaleDateString("pt-BR");
        },
      },
      {
        field: "status",
        headerName: "Status",
        flex: 1,
        minWidth: 130,
        align: "center",
        headerAlign: "center",
        renderCell: (params: GridRenderCellParams) => {
          let cor: "warning" | "success" | "error" = "warning";
          if (params.value === "Aprovado") cor = "success";
          if (params.value === "Revisar") cor = "error";

          return (
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
              <Tooltip title={params.row.observacaoSupervisor || "Aguardando análise"}>
                <Chip label={params.value} color={cor} size="small" sx={{ fontWeight: "bold" }} />
              </Tooltip>
            </Box>
          );
        },
      },
      {
        field: "acoes",
        headerName: "Ações",
        width: 120, // Apenas as Ações ficam com tamanho FIXO para não esmagar os botões
        sortable: false,
        align: "center",
        headerAlign: "center",
        renderCell: (params: GridRenderCellParams) => (
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" height="100%">
            <Tooltip title="Baixar PDF">
              <IconButton color="primary" size="small" onClick={() => console.log("PDF:", params.row._id)}>
                <PictureAsPdfIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            {params.row.status !== "Aprovado" && (
              <Tooltip title="Excluir Relatório">
                <IconButton color="error" size="small" onClick={() => handleDeleteRelatorio(params.row._id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        ),
      },
    ],
    [],
  );

  return (
    <Box sx={{ p: 3, maxWidth: 1400, mx: "auto" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 4, gap: 2 }}>
        <Box>
          <Typography variant="h5" fontWeight="bold" color="text.primary">
            Meus Relatórios
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Gere relatórios mensais para aprovação da empresa.
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setOpenModal(true)}
          sx={{ display: { xs: "none", lg: "flex" }, flexShrink: 0 }}>
          Gerar Relatório Mensal
        </Button>
      </Stack>

      {/* A TABELA DE RELATÓRIOS */}
      <Box sx={{ height: 400, width: "100%", backgroundColor: "background.paper", borderRadius: 1, boxShadow: 1 }}>
        <DataGrid
          rows={relatorios}
          columns={columns}
          getRowId={(row) => row._id}
          loading={loadingTable}
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        />
      </Box>

      {/* BOTÃO MOBILE (FAB) */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setOpenModal(true)}
        sx={{
          display: { md: "flex", lg: "none" }, // Aparece no celular (xs/sm), some no PC (md+)
          position: "fixed",
          bottom: 24,
          right: 24,
          boxShadow: 3,
        }}>
        <AddIcon />
      </Fab>

      {/* Modal*/}
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
