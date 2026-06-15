import { Box, Container, Typography, Card, CardContent, Grid, Stack } from "@mui/material";
import {
  Place as PlaceIcon,
  Phone as PhoneIcon,
  AccessTime as ClockIcon,
  Email as EmailIcon,
} from "@mui/icons-material";

const cartoesContato = [
  {
    icon: <PlaceIcon sx={{ fontSize: 28 }} />,
    title: "Endereço",
    content: ["CIEM III", "Av. Jerônimo de Camargo, 421", "Caetetuba - Atibaia/SP", "CEP 12951-540"],
  },
  {
    icon: <PhoneIcon sx={{ fontSize: 28 }} />,
    title: "Telefone",
    content: ["(11) 4402-1047", "(11) 4402-1010"],
  },
  {
    icon: <EmailIcon sx={{ fontSize: 28 }} />,
    title: "E-mails institucionais",
    content: [
      "Diretoria: f309dir@cps.sp.gov.br",
      "Diretoria Administrativa: f309adm@cps.sp.gov.br",
      "Diretoria Acadêmica: f309acad@cps.sp.gov.br",
    ],
  },
  {
    icon: <ClockIcon sx={{ fontSize: 28 }} />,
    title: "Atendimento",
    content: ["Segunda a Sexta-feira", "Das 07:30 às 22:30"],
  },
];

export default function Contato() {
  return (
    <Box
      id="contato"
      sx={{
        py: { xs: 8, md: 10 },
        bgcolor: "#f9f6f7",
        borderTop: "1px solid #efe2e4",
      }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="overline" sx={{ color: "#8b1e2d", fontWeight: 700, letterSpacing: 1.2 }}>
            Contato
          </Typography>

          <Typography variant="h4" sx={{ fontWeight: 800, mt: 1.5, mb: 2, color: "#1f1f1f" }}>
            Informações institucionais da Fatec Atibaia
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {cartoesContato.map((item) => (
            <Grid key={item.title} size={{ xs: 12, sm: 6 }}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  border: "1px solid #ead7da",
                  bgcolor: "#fff",
                }}>
                <CardContent sx={{ p: 3.5 }}>
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "#f7e8ea",
                      color: "#8b1e2d",
                      mb: 2,
                    }}>
                    {item.icon}
                  </Box>

                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: "#1f1f1f" }}>
                    {item.title}
                  </Typography>

                  <Stack spacing={0.9}>
                    {item.content.map((line) => (
                      <Typography key={line} sx={{ color: "#5b5560", lineHeight: 1.7 }}>
                        {line}
                      </Typography>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
