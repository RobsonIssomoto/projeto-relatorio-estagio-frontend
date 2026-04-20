import { useState, useEffect, useMemo } from "react";
import { Box, IconButton, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ptBR } from "@mui/x-data-grid/locales";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { api } from "../../../../services/api";

interface Atividade {
  _id: string;
  titulo: string;
  dataAtividade: string;
  horas: number;
}

export const TabelaAtividades = () => {
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Efeito que busca os dados no MongoDB ao abrir a tela
  useEffect(() => {
    const buscarAtividades = async () => {
      try {
        // ID do usuário de teste (o mesmo que usamos no Postman)
        const resposta = await api.get("/api/v1/atividades/aluno/69e5a714881701b1b1318e8d");
        setAtividades(resposta.data);
      } catch (error) {
        console.error("Erro ao buscar atividades:", error);
      } finally {
        setIsLoading(false);
      }
    };

    buscarAtividades();
  }, []);

  // Função para deletar uma atividade
  const handleDelete = async (id: string) => {
    // 1. Confirmação de segurança (UX básica para evitar cliques acidentais)
    const confirmar = window.confirm("Tem certeza que deseja excluir esta atividade?");
    if (!confirmar) return;

    try {
      // 2. Avisa a Tabela que está carregando
      setIsLoading(true);

      // 3. Pede para a API deletar no MongoDB
      await api.delete(`/api/v1/atividades/${id}`);

      // 4. Atualiza a tabela na hora, SEM DAR F5!
      // Ele pega a lista atual e filtra, removendo o ID que acabamos de apagar
      setAtividades((listaAnterior) => listaAnterior.filter((ativ) => ativ._id !== id));
    } catch (error) {
      console.error("Erro ao deletar:", error);
      alert("Erro ao excluir a atividade.");
    } finally {
      setIsLoading(false);
    }
  };

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "titulo", headerName: "Título da Atividade", flex: 1, minWidth: 200 },
      {
        field: "dataAtividade",
        headerName: "Data",
        width: 130,
        valueFormatter: (value?: string) => {
          if (!value) return "";
          const data = new Date(value);
          return data.toLocaleDateString("pt-BR", { timeZone: "UTC" });
        },
      },
      { field: "horas", headerName: "Horas", width: 100, align: "center", headerAlign: "center" },
      {
        field: "acoes",
        headerName: "Ações",
        width: 120,
        sortable: false,
        align: "center",
        headerAlign: "center",
        renderCell: (params: GridRenderCellParams) => (
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" height="100%">
            <IconButton color="primary" size="small" onClick={() => console.log("Ver:", params.row._id)}>
              <VisibilityIcon fontSize="small" />
            </IconButton>
            <IconButton color="error" size="small" onClick={() => handleDelete(params.row._id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
        ),
      },
    ],
    [],
  );

  return (
    <Box sx={{ height: 400, width: "100%", backgroundColor: "background.paper", borderRadius: 1, boxShadow: 1 }}>
      <DataGrid
        rows={atividades} // <-- AQUI a variável de estado é preenchida pela API
        columns={columns}
        getRowId={(row) => row._id} // Ensina o DataGrid a usar o _id do MongoDB
        loading={isLoading}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 20]}
        disableRowSelectionOnClick
        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
      />
    </Box>
  );
};
