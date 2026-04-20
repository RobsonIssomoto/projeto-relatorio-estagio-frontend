import { useMemo } from "react";
import { Box, Chip, IconButton, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ptBR } from "@mui/x-data-grid/locales";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

// 1. Interface de dados
interface Atividade {
  id: number;
  descricaoAtividade: string;
  dtAtividade: string;
  qtdHoras: number;
  pendencias: string;
}

// 2. Os dados (Mock)
const listaAtividades: Atividade[] = [
  {
    id: 1,
    descricaoAtividade: "Planejamento do frontend",
    dtAtividade: "01/04/2026",
    qtdHoras: 20,
    pendencias: "aprovado",
  },
  {
    id: 2,
    descricaoAtividade: "Desenvolvimento do frontend",
    dtAtividade: "10/04/2026",
    qtdHoras: 30,
    pendencias: "pendente",
  },
  { id: 3, descricaoAtividade: "Testes do frontend", dtAtividade: "20/04/2026", qtdHoras: 15, pendencias: "reprovado" },
];

// 3. Função de cor do Status
const getCorStatus = (status: string) => {
  switch (status.toLowerCase()) {
    case "aprovado":
      return "success";
    case "pendente":
      return "warning";
    case "reprovado":
      return "error";
    default:
      return "default";
  }
};

export const TabelaAtividades = () => {
  // 1. Funções de Mock
  const handleEdit = (id: number) => {
    alert(`Abrindo modal para visualizar a atividade ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    if (window.confirm(`Tem certeza que deseja deletar a atividade ${id}?`)) {
      alert(`Atividade ${id} deletada com sucesso! (Simulação)`);
    }
  };

  // 2. Envolvendo as colunas no useMemo para garantir a performance da pesquisa
  const columns = useMemo<GridColDef[]>(
    () => [
      { field: "descricaoAtividade", headerName: "Descrição", flex: 1, minWidth: 200 },
      { field: "dtAtividade", headerName: "Data", width: 150, align: "center", headerAlign: "center" },
      {
        field: "qtdHoras",
        headerName: "Horas",
        type: "number",
        width: 120,
        align: "center",
        headerAlign: "center",
        valueFormatter: (value: number) => (value == null ? "0h" : `${value}h`),
      },
      {
        field: "pendencias",
        headerName: "Status",
        width: 160,
        align: "center",
        headerAlign: "center",
        renderCell: (params: GridRenderCellParams) => (
          <Chip
            label={String(params.value).toUpperCase()}
            color={getCorStatus(String(params.value))}
            size="small"
            variant="outlined"
            sx={{ fontWeight: "bold" }}
          />
        ),
      },
      {
        field: "acoes",
        headerName: "Ações",
        width: 140,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        align: "center",
        headerAlign: "center",
        renderCell: (params: GridRenderCellParams) => (
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" height="100%">
            {/* 3. Chamada de funções passando o ID da linha! */}
            <IconButton color="primary" size="small" onClick={() => handleEdit(params.row.id as number)}>
              <VisibilityIcon fontSize="small" />
            </IconButton>

            <IconButton color="error" size="small" onClick={() => handleDelete(params.row.id as number)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
        ),
      },
    ],
    [],
  ); // <--- Os colchetes vazios dizem ao React: "Gere as colunas apenas uma vez"

  return (
    <Box sx={{ height: 400, width: "100%", backgroundColor: "background.paper", borderRadius: 1, boxShadow: 1 }}>
      <DataGrid
        rows={listaAtividades}
        columns={columns} // As colunas vêm do useMemo
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        disableRowSelectionOnClick
        showToolbar
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
      />
    </Box>
  );
};
