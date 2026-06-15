import { Box, Container, Typography } from "@mui/material";

export default function Rodape() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        bgcolor: "#7a1422",
        color: "#fcebed",
        textAlign: "center",
      }}>
      <Container maxWidth="lg">
        <Typography sx={{ fontSize: 14 }}>Sistema de Gestão de Atividades de Estágio • Fatec Atibaia</Typography>
      </Container>
    </Box>
  );
}
