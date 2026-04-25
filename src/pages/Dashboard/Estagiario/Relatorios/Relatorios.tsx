import { useState, useEffect, useMemo } from "react";
import { Box, Typography, Button, Stack, Fab, IconButton, Chip, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ptBR } from "@mui/x-data-grid/locales";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

// Ícones do Material UI
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

// API e o componente isolado
import { api } from "../../../../services/api";
import { ModalGerarRelatorio } from "./components/ModalGerarRelatorio";

const ALUNO_ID = "69e5a714881701b1b1318e8d";
const ALUNO_NOME = "Estagiário Teste";

// Tipagens
interface IRelatorio {
  _id: string;
  mesReferencia: string;
  horasRealizadas: number;
  status: "Pendente" | "Aprovado" | "Devolvido";
  observacao?: string;
}

export const Relatorios = () => {
  const [relatorios, setRelatorios] = useState<IRelatorio[]>([]); // Sem 'any'!
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);

  const buscarRelatorios = async () => {
    setIsLoading(true);
    try {
      const resposta = await api.get(`/api/v1/relatorios/aluno/${ALUNO_ID}`);
      setRelatorios(resposta.data);
    } catch (error) {
      console.error("Erro ao buscar relatórios:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    buscarRelatorios();
  }, []);

  // Função de deletar com a correção do finally
  const handleDeleteRelatorio = async (id: string) => {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este relatório? Ele voltará a ser apenas atividades soltas.",
    );
    if (!confirmar) return;

    try {
      setLoadingTable(true);
      await api.delete(`/api/v1/relatorios/${id}`);
      setRelatorios((prev) => prev.filter((r) => r._id !== id));
    } catch (error) {
      console.error("Erro ao deletar relatório:", error);
      alert("Erro ao excluir relatório.");
    } finally {
      setLoadingTable(false);
    }
  };

  // Suas colunas originais
  const columns: GridColDef[] = useMemo(
    () => [
      { field: "mesReferencia", headerName: "Mês", minWidth: 150, flex: 1 },
      {
        field: "horasRealizadas",
        headerName: "Horas Validadas",
        minWidth: 150,
        flex: 1,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "status",
        headerName: "Status",
        minWidth: 150,
        flex: 1,
        align: "center",
        headerAlign: "center",
        renderCell: (params: GridRenderCellParams) => {
          let color: "warning" | "success" | "error" = "warning";
          if (params.value === "Aprovado") color = "success";
          if (params.value === "Devolvido") color = "error";

          const chip = <Chip label={params.value} color={color} size="small" variant="outlined" />;
          if (params.value === "Devolvido" && params.row.observacao) {
            return (
              <Tooltip title={`Motivo: ${params.row.observacao}`} arrow>
                {chip}
              </Tooltip>
            );
          }
          return chip;
        },
      },
      {
        field: "acoes",
        headerName: "Ações",
        width: 120,
        sortable: false,
        align: "center",
        headerAlign: "center",
        renderCell: (params: GridRenderCellParams) => (
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" height="100%">
            <IconButton color="error" size="small" onClick={() => handleDeleteRelatorio(params.row._id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
        ),
      },
    ],
    [],
  );

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
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

      <Box sx={{ height: 400, width: "100%", backgroundColor: "background.paper", borderRadius: 1, boxShadow: 1 }}>
        <DataGrid
          rows={relatorios}
          columns={columns}
          getRowId={(row) => row._id}
          loading={isLoading || loadingTable}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        />
      </Box>

      {/* FAB Mobile */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setOpenModal(true)}
        sx={{
          display: { md: "flex", lg: "none" },
          position: "fixed",
          bottom: 24,
          right: 24,
          boxShadow: 3,
        }}>
        <AddIcon />
      </Fab>

      {/* O COMPONENTE */}
      <ModalGerarRelatorio
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={buscarRelatorios}
        alunoId={ALUNO_ID}
        alunoNome={ALUNO_NOME}
      />
    </Box>
  );
};
