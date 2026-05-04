import { Box } from "@mui/material";
import FormularioAtividade from "../components/FormularioAtividade";

export const TelaRegistrarAtividade = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
      <FormularioAtividade />
    </Box>
  );
};
