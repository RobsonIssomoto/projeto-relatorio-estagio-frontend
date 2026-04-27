import { useState } from "react";
import { Box, Typography, Paper, Avatar, Stack, IconButton, Tooltip, Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { ptBR } from "@mui/x-data-grid/locales";

// Ícones
import PeopleIcon from "@mui/icons-material/People";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";

// 1. INTERFACE
interface CardMetricaProps {
  titulo: string;
  valor: string | number;
  icone: React.ReactNode;
  corIcone: "primary" | "error" | "success" | "warning" | "info";
}

// 2. COMPONENTE DE CARD PADRONIZADO
const CardMetrica = ({ titulo, valor, icone, corIcone }: CardMetricaProps) => (
  <Paper
    elevation={0}
    sx={{
      p: 3,
      borderRadius: 2,
      border: "1px solid",
      borderColor: "divider",
    }}>
    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
      <Box>
        <Typography variant="overline" color="text.secondary" fontWeight="600" sx={{ letterSpacing: 0.5 }}>
          {titulo}
        </Typography>
        <Typography variant="h4" fontWeight="bold" sx={{ mt: 0.5 }}>
          {valor}
        </Typography>
      </Box>
      <Avatar sx={{ bgcolor: `${corIcone}.light`, color: `${corIcone}.main`, width: 48, height: 48 }}>{icone}</Avatar>
    </Stack>
  </Paper>
);

export const DashboardSupervisor = () => {
  const [isLoading] = useState(false);

  // 3. DEFINIÇÃO DAS COLUNAS DO DATAGRID
  const columns: GridColDef[] = [
    { field: "nome", headerName: "Aluno", flex: 1, minWidth: 200 },
    { field: "curso", headerName: "Curso", flex: 1, minWidth: 180 },
    { field: "empresa", headerName: "Empresa", flex: 1, minWidth: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          variant="outlined"
          color={params.value === "Aprovado" ? "success" : params.value === "Pendente" ? "error" : "warning"}
          sx={{ fontWeight: "bold", width: "90px" }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Ação",
      width: 100,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: () => (
        <Tooltip title="Ver Detalhes">
          <IconButton color="primary" size="small">
            <VisibilityIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  // Dados Mockados (Simulando vinda do MongoDB com _id)
  const estagiarios = [
    { _id: "1", nome: "Ana Carolina Silva", curso: "ADS", empresa: "Tech Solutions", status: "Pendente" },
    { _id: "2", nome: "Carlos Eduardo Costa", curso: "Gestão TI", empresa: "InovaCorp", status: "Aprovado" },
    { _id: "3", nome: "Mariana Souza", curso: "ADS", empresa: "SoftWeb", status: "Revisão" },
  ];

  return (
    <Box sx={{ p: 3, maxWidth: 1400, mx: "auto" }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight="bold" color="text.primary">
          Painel de Supervisão
        </Typography>
      </Box>

      <Stack spacing={8}>
        {" "}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)", // Ajustado para 3 colunas fluídas
            },
            gap: 3,
          }}>
          <CardMetrica titulo="ESTAGIÁRIOS" valor={12} icone={<PeopleIcon />} corIcone="primary" />
          <CardMetrica titulo="PENDENTES" valor={3} icone={<AssignmentLateIcon />} corIcone="error" />
          <CardMetrica titulo="APROVADOS" valor={8} icone={<CheckCircleIcon />} corIcone="success" />
        </Box>
        {/* DATAGRID: Padronizado com as outras telas do sistema */}
        <Box sx={{ height: 400, width: "100%", backgroundColor: "background.paper", borderRadius: 1, boxShadow: 1 }}>
          <DataGrid
            rows={estagiarios}
            columns={columns}
            getRowId={(row) => row._id}
            loading={isLoading}
            initialState={{
              pagination: { paginationModel: { page: 0, pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10, 20]}
            disableRowSelectionOnClick
            localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
            sx={{
              border: "none",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f5f7fa",
                fontWeight: "bold",
              },
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
};
