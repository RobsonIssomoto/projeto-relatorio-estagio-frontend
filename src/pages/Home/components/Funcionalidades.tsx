import { Box, Container, Typography, Card, CardContent, Grid } from "@mui/material";
import {
  Description as DocumentIcon,
  NotificationImportant as BellIcon,
  School as SchoolIcon,
} from "@mui/icons-material";

const funcionalidades = [
  {
    icon: <DocumentIcon sx={{ fontSize: 34 }} />,
    title: "Gestão de documentos",
    text: "Centralize termos, relatórios e registros acadêmicos em um único ambiente, com mais organização e rastreabilidade.",
  },
  {
    icon: <BellIcon sx={{ fontSize: 34 }} />,
    title: "Controle de prazos",
    text: "Acompanhe datas importantes com mais segurança por meio de alertas e organização do fluxo de entregas.",
  },
  {
    icon: <SchoolIcon sx={{ fontSize: 34 }} />,
    title: "Acompanhamento do estágio",
    text: "Monitore atividades, histórico e evolução do aluno durante todo o período de estágio supervisionado.",
  },
];

export default function Funcionalidades() {
  return (
    <Box sx={{ py: { xs: 8, md: 10 } }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="overline"
            sx={{
              color: "#8b1e2d",
              fontWeight: 700,
              letterSpacing: 1.2,
            }}>
            Funcionalidades
          </Typography>

          <Typography variant="h4" sx={{ fontWeight: 800, mt: 1.5, mb: 2, color: "#1f1f1f" }}>
            Recursos para uma gestão mais eficiente do estágio
          </Typography>

          <Typography
            sx={{
              color: "#5b5560",
              maxWidth: 760,
              mx: "auto",
              lineHeight: 1.8,
            }}>
            Organize processos acadêmicos com mais clareza, reduza falhas no acompanhamento e facilite o acesso às
            informações essenciais do estágio supervisionado.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {funcionalidades.map((item) => (
            <Grid key={item.title} size={{ xs: 12, md: 4 }}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  border: "1px solid #ead7da",
                  bgcolor: "#ffffff",
                  boxShadow: "0 10px 30px rgba(90, 20, 30, 0.05)",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 18px 40px rgba(90, 20, 30, 0.10)",
                  },
                }}>
                <CardContent sx={{ p: 3.5 }}>
                  <Box
                    sx={{
                      width: 58,
                      height: 58,
                      borderRadius: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "#f7e8ea",
                      color: "#8b1e2d",
                      mb: 2.5,
                    }}>
                    {item.icon}
                  </Box>

                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: "#1f1f1f" }}>
                    {item.title}
                  </Typography>

                  <Typography sx={{ color: "#5b5560", lineHeight: 1.8 }}>{item.text}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
