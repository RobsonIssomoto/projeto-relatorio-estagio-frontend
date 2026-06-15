import { Box, Container, Typography, Card, CardContent, Grid, Divider, Stack } from "@mui/material";
import { Description as DocumentIcon, School as SchoolIcon, Business as BusinessIcon } from "@mui/icons-material";

export default function Sobre() {
  return (
    <Box
      id="sobre"
      sx={{
        py: { xs: 8, md: 10 },
        bgcolor: "#fff",
        borderTop: "1px solid #efe2e4",
      }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="overline"
              sx={{
                color: "#8b1e2d",
                fontWeight: 700,
                letterSpacing: 1.2,
              }}>
              Sobre o sistema
            </Typography>

            <Typography variant="h4" sx={{ fontWeight: 800, mt: 1.5, mb: 2, color: "#1f1f1f" }}>
              Apoio à gestão acadêmica das atividades de estágio
            </Typography>

            <Typography sx={{ color: "#5b5560", lineHeight: 1.9, mb: 2 }}>
              O sistema foi idealizado para oferecer uma experiência mais organizada no acompanhamento do estágio
              supervisionado, reunindo in um único ambiente as informações mais importantes para alunos, professores
              orientadores e coordenação.
            </Typography>

            <Typography sx={{ color: "#5b5560", lineHeight: 1.9, mb: 2 }}>
              A proposta é reduzir processos manuais, facilitar o registro de atividades, melhorar o controle de prazos
              e ampliar a transparência no fluxo acadêmico relacionado ao estágio.
            </Typography>

            <Typography sx={{ color: "#5b5560", lineHeight: 1.9 }}>
              Com uma interface objetiva e foco institucional, a plataforma busca apoiar a rotina acadêmica com mais
              padronização, confiabilidade e facilidade de acesso às informações.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                border: "1px solid #ead7da",
                bgcolor: "#fcf7f8",
              }}>
              <CardContent sx={{ p: 4 }}>
                <Stack spacing={3}>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <BusinessIcon sx={{ color: "#8b1e2d", mt: 0.3 }} />
                    <Box>
                      <Typography sx={{ fontWeight: 700, mb: 0.5 }}>Finalidade institucional</Typography>
                      <Typography sx={{ color: "#5b5560", lineHeight: 1.8 }}>
                        Apoiar a organização das rotinas de estágio e fortalecer o acompanhamento acadêmico.
                      </Typography>
                    </Box>
                  </Box>

                  <Divider />

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <DocumentIcon sx={{ color: "#8b1e2d", mt: 0.3 }} />
                    <Box>
                      <Typography sx={{ fontWeight: 700, mb: 0.5 }}>Centralização das informações</Typography>
                      <Typography sx={{ color: "#5b5560", lineHeight: 1.8 }}>
                        Reúne documentos, registros e dados relevantes em um único ambiente de consulta.
                      </Typography>
                    </Box>
                  </Box>

                  <Divider />

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <SchoolIcon sx={{ color: "#8b1e2d", mt: 0.3 }} />
                    <Box>
                      <Typography sx={{ fontWeight: 700, mb: 0.5 }}>Foco acadêmico</Typography>
                      <Typography sx={{ color: "#5b5560", lineHeight: 1.8 }}>
                        Estrutura pensada para atender a realidade institucional da Fatec Atibaia e o contexto do
                        estágio supervisionado.
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
