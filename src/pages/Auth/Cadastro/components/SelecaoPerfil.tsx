// src/pages/Auth/Cadastro/components/SelecaoPerfil.tsx
import { Box, Container, Paper, Typography, Card, CardActionArea } from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import BusinessIcon from "@mui/icons-material/Business";

// Tipagem da função que muda a tela
interface Props {
  setEtapa: (etapa: "selecao" | "estagiario" | "empresa") => void;
}

export default function SelecaoPerfil({ setEtapa }: Props) {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
          Qual é o seu perfil?
        </Typography>

        <Box sx={{ display: "flex", gap: 3, justifyContent: "center", flexWrap: "wrap" }}>
          {/* Cartão Estagiário */}
          <Card sx={{ width: 220, border: "1px solid transparent", "&:hover": { borderColor: "primary.main" } }}>
            <CardActionArea onClick={() => setEtapa("estagiario")} sx={{ p: 2, height: "100%" }}>
              <SchoolIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="subtitle1" fontWeight="bold">
                ESTAGIÁRIO
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontSize: "0.8rem" }}>
                Sou aluno e vou enviar e acompanhar meus documentos de estágio.
              </Typography>
            </CardActionArea>
          </Card>

          {/* Cartão Empresa */}
          <Card sx={{ width: 220, border: "1px solid transparent", "&:hover": { borderColor: "success.main" } }}>
            <CardActionArea onClick={() => setEtapa("empresa")} sx={{ p: 2, height: "100%" }}>
              <BusinessIcon color="success" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="subtitle1" fontWeight="bold">
                EMPRESA
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontSize: "0.8rem" }}>
                Somos uma empresa e vamos gerenciar a documentação dos nossos estagiários.
              </Typography>
            </CardActionArea>
          </Card>
        </Box>
      </Paper>
    </Container>
  );
}
