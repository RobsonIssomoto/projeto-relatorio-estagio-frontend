import { Box, Button, Fab, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { TabelaAtividades } from "../components/TabelaAtividades";

export const Atividade = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 3, maxWidth: 1400, mx: "auto" }}>
      {/* CABEÇALHO */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{ mb: 4, gap: 2 }} // gap: 2 garante que o botão nunca grude no texto
      >
        <Box>
          <Typography variant="h5" fontWeight="bold" color="text.primary">
            Minhas Atividades
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Gerencie todas as atividades realizadas no seu estágio.
          </Typography>
        </Box>

        {/* BOTÃO DESKTOP (Normal)
          display: { xs: "none", sm: "flex" } -> Esconde no celular, mostra no PC
          flexShrink: 0 -> Impede que o botão seja "esmagado" se faltar espaço
        */}
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate("/dashboard/atividades/nova")}
          sx={{ display: { xs: "none", lg: "flex" }, flexShrink: 0 }}>
          Cadastrar Atividade
        </Button>
      </Stack>

      {/* A  TABELA */}
      <TabelaAtividades />

      {/* BOTÃO MOBILE (Flutuante / FAB)
        display: { xs: "flex", sm: "none" } -> Mostra no celular, esconde no PC
      */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => navigate("/dashboard/atividades/nova")}
        sx={{
          display: { md: "flex", lg: "none" }, // Só aparece em telas pequenas
          position: "fixed", // Prende o botão na tela (ele não rola com a página)
          bottom: 24, // Distância do fundo
          right: 24, // Distância da direita
          boxShadow: 3,
        }}>
        <AddIcon />
      </Fab>
    </Box>
  );
};
