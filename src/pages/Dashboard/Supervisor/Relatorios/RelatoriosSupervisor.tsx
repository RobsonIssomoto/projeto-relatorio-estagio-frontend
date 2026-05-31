import { useState, useEffect, useMemo } from "react";
import { Box, Typography, Stack, IconButton, Tooltip, Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ptBR } from "@mui/x-data-grid/locales";

// Ícones
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import { api } from "../../../../services/api"; // Ajuste o caminho conforme sua estrutura
import { ModalDevolucao } from "./components/ModalDevolucao"; // Faremos no próximo passo!

interface IRelatorioSupervisor {
  _id: string;
  alunoId: number;
  aluno: string;
  mesReferencia: string;
  horasRealizadas: number;
  status: string;
}

export const RelatoriosSupervisor = () => {
  const [relatorios, setRelatorios] = useState<IRelatorioSupervisor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [relatorioSelecionado, setRelatorioSelecionado] = useState<string | null>(null);

  const buscarRelatoriosPendentes = async () => {
    setIsLoading(true);
    try {
      const resposta = await api.get("/api/relatorios/supervisor/pendentes");
      setRelatorios(resposta.data);
    } catch (erro) {
      console.error("Erro ao buscar relatórios:", erro);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    buscarRelatoriosPendentes();
  }, []);

  const handleAprovar = async (id: string) => {
    try {
      await api.put(`/api/relatorios/${id}/avaliar`, { status: "Aprovado" });
      // Atualiza a tabela removendo o relatório aprovado da lista de pendentes
      setRelatorios((prev) => prev.filter((r) => r._id !== id));
    } catch (erro) {
      console.error("Erro ao aprovar:", erro);
      alert("Erro ao aprovar o relatório.");
    }
  };

  const handleAbrirModalDevolucao = (id: string) => {
    setRelatorioSelecionado(id);
    setOpenModal(true);
  };

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "aluno", headerName: "Estagiário", minWidth: 200, flex: 1 },
      { field: "mesReferencia", headerName: "Mês", width: 150 },
      { field: "horasRealizadas", headerName: "Horas", width: 120, align: "center", headerAlign: "center" },
      {
        field: "status",
        headerName: "Status",
        width: 150,
        align: "center",
        headerAlign: "center",
        renderCell: (params: GridRenderCellParams) => (
          <Chip label={params.value} color="warning" size="small" variant="outlined" />
        ),
      },
      {
        field: "acoes",
        headerName: "Avaliar",
        width: 150,
        sortable: false,
        align: "center",
        headerAlign: "center",
        renderCell: (params: GridRenderCellParams) => {
          const relatorio = params.row;

          return (
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" height="100%">
              {/* Botão de Aprovar */}
              <Tooltip title="Aprovar Relatório">
                <IconButton color="success" size="small" onClick={() => handleAprovar(relatorio._id)}>
                  <CheckCircleIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              {/* Botão de Devolver */}
              <Tooltip title="Devolver para Correção">
                <IconButton color="error" size="small" onClick={() => handleAbrirModalDevolucao(relatorio._id)}>
                  <CancelIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          );
        },
      },
    ],
    [],
  );

  return (
    <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", p: { xs: 2, md: 3 } }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h5" fontWeight="bold" color="text.primary">
            Relatórios para Validação
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Avalie os relatórios mensais enviados pelos seus estagiários.
          </Typography>
        </Box>
      </Stack>

      <Box sx={{ height: 500, width: "100%", backgroundColor: "background.paper", borderRadius: 1, boxShadow: 1 }}>
        <DataGrid
          rows={relatorios}
          columns={columns}
          getRowId={(row) => row._id}
          loading={isLoading}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          disableRowSelectionOnClick
        />
      </Box>

      {
        <ModalDevolucao
          open={openModal}
          onClose={() => setOpenModal(false)}
          relatorioId={relatorioSelecionado}
          onSuccess={buscarRelatoriosPendentes}
        />
      }
    </Box>
  );
};
