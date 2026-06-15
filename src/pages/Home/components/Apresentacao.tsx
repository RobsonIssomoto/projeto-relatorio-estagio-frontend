import { Box, Container, Typography, Stack, Button, Card, CardContent, Grid } from "@mui/material";
import { ArrowForward as ArrowForwardIcon } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

export default function Apresentacao() {
  return (
    <Box
      id="inicio"
      sx={{
        background: "linear-gradient(135deg, #6e1622 0%, #8b1e2d 50%, #b20000 100%)",
        color: "#fff",
        py: { xs: 10, md: 14 },
        position: "relative",
        overflow: "hidden",
      }}>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.1,
          background: "radial-gradient(circle at top right, rgba(255,255,255,0.35) 0%, transparent 28%)",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                lineHeight: 1.1,
                mb: 3,
                fontSize: { xs: "2.2rem", md: "3.4rem" },
              }}>
              Sistema de Gestão de Atividades de Estágio
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: "#fcebed",
                lineHeight: 1.7,
                mb: 4,
                maxWidth: 720,
                fontSize: { xs: "1rem", md: "1.1rem" },
                fontWeight: 400,
              }}>
              Plataforma desenvolvida para registrar, acompanhar e organizar as atividades de estágio, com controle de
              documentos, prazos e comunicação entre alunos, orientadores e instituição.
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                component={RouterLink}
                to="/login"
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: "#ffffff",
                  color: "#7a1422",
                  px: 3.5,
                  py: 1.4,
                  borderRadius: 2.5,
                  fontWeight: 700,
                  textTransform: "none",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
                  "&:hover": {
                    bgcolor: "#f4eaea",
                  },
                }}>
                Acessar sistema
              </Button>

              <Button
                component="a"
                href="/home#sobre"
                variant="outlined"
                sx={{
                  px: 3.5,
                  py: 1.4,
                  borderRadius: 2.5,
                  fontWeight: 600,
                  textTransform: "none",
                  color: "#fff",
                  borderColor: "rgba(255,255,255,0.4)",
                  "&:hover": {
                    borderColor: "#fff",
                    bgcolor: "rgba(255,255,255,0.08)",
                  },
                }}>
                Saiba mais
              </Button>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                bgcolor: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.18)",
                backdropFilter: "blur(8px)",
                color: "#fff",
              }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="overline" sx={{ color: "#ffd7dc", fontWeight: 700, letterSpacing: 1 }}>
                  Visão geral
                </Typography>

                <Stack spacing={2.2} sx={{ mt: 2 }}>
                  {[
                    "Registro centralizado de atividades e documentos",
                    "Acompanhamento acadêmico com mais organização",
                    "Controle de prazos e rotinas do estágio",
                    "Interface pensada para alunos e orientadores",
                  ].map((item) => (
                    <Box
                      key={item}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 1.5,
                      }}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          mt: "9px",
                          borderRadius: "50%",
                          bgcolor: "#ffd0d6",
                          flexShrink: 0,
                        }}
                      />
                      <Typography sx={{ color: "#fff3f4", lineHeight: 1.7 }}>{item}</Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
