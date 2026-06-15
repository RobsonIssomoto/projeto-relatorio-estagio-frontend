import { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
  Divider,
} from "@mui/material";
import {
  Add as AddIcon,
  Description as DocumentIcon,
  NotificationImportant as BellIcon,
  School as SchoolIcon,
  Place as PlaceIcon,
  Phone as PhoneIcon,
  AccessTime as ClockIcon,
  ArrowForward as ArrowForwardIcon,
  Email as EmailIcon,
  Business as BusinessIcon,
} from "@mui/icons-material";

const features = [
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

const contactCards = [
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

const faqItems = [
  {
    question: "Como faço meu cadastro no sistema?",
    answer:
      "O cadastro pode ser realizado pela área de acesso da plataforma, mediante preenchimento das informações básicas solicitadas. Após o envio, o usuário poderá acessar o sistema conforme o perfil disponibilizado.",
  },
  {
    question: "Quem pode acessar a plataforma?",
    answer:
      "A plataforma foi estruturada para atender alunos, orientadores e setores acadêmicos envolvidos no acompanhamento do estágio, de acordo com os perfis e permissões definidos no sistema.",
  },
  {
    question: "Esqueci minha senha. Como recuperar o acesso?",
    answer:
      "Na tela de login, o usuário poderá utilizar a opção de recuperação de acesso. Após a confirmação dos dados cadastrados, será possível redefinir a senha e retornar ao sistema.",
  },
  {
    question: "Quais documentos podem ser registrados no sistema?",
    answer:
      "O sistema permite centralizar documentos relacionados ao estágio, como registros acadêmicos, comprovantes, formulários, relatórios parciais e relatórios finais, conforme a necessidade institucional.",
  },
  {
    question: "Como funciona o envio dos relatórios de estágio?",
    answer:
      "Os relatórios podem ser cadastrados diretamente na plataforma, permitindo o envio organizado das atividades realizadas durante o estágio e facilitando a conferência por parte do orientador ou do setor responsável.",
  },
  {
    question: "Posso acompanhar o status das minhas atividades?",
    answer:
      "Sim. A plataforma foi pensada para permitir o acompanhamento do histórico de atividades, entregas realizadas e informações vinculadas ao estágio supervisionado.",
  },
  {
    question: "Como sei se meu relatório foi validado?",
    answer:
      "Após a análise do responsável, o sistema pode apresentar o andamento da validação, permitindo ao usuário identificar se o relatório foi aceito, está em revisão ou necessita de ajustes.",
  },
  {
    question: "O sistema avisa sobre prazos e pendências?",
    answer:
      "Sim. A proposta da plataforma inclui o controle de prazos e pendências para reduzir esquecimentos e melhorar a organização das entregas e validações relacionadas ao estágio.",
  },
];

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#inicio") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    if (location.hash) {
      const element = document.querySelector(location.hash);

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [location]);

  return (
    <Box sx={{ bgcolor: "#f7f7f8", color: "#1f1f1f" }}>
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
            {features.map((item) => (
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
                supervisionado, reunindo em um único ambiente as informações mais importantes para alunos, professores
                orientadores e coordenação.
              </Typography>

              <Typography sx={{ color: "#5b5560", lineHeight: 1.9, mb: 2 }}>
                A proposta é reduzir processos manuais, facilitar o registro de atividades, melhorar o controle de
                prazos e ampliar a transparência no fluxo acadêmico relacionado ao estágio.
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

      <Box
        id="duvida"
        sx={{
          mt: { xs: 10 },
          py: { xs: 8, md: 10 },
          bgcolor: "#ffffff",
          borderTop: "1px solid #efe2e4",
        }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography
              variant="overline"
              sx={{
                color: "#8b1e2d",
                fontWeight: 700,
                letterSpacing: 1.2,
              }}>
              Perguntas frequentes
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                mt: 1.5,
                mb: 2,
                color: "#1f1f1f",
              }}>
              Tire suas dúvidas sobre o sistema
            </Typography>

            <Typography
              sx={{
                color: "#5b5560",
                maxWidth: 680,
                mx: "auto",
                lineHeight: 1.8,
              }}>
              Reunimos respostas para as dúvidas mais comuns sobre cadastro, acesso, envio de atividades, relatórios e
              validações do estágio.
            </Typography>
          </Box>

          <Stack>
            {faqItems.map((item) => (
              <Box key={item.question} sx={{ mb: 2.2 }}>
                <Accordion
                  disableGutters
                  elevation={0}
                  sx={{
                    border: "1.5px solid #2f2a2b",
                    borderRadius: "0px",
                    bgcolor: "#fff",
                    boxShadow: "none",
                    overflow: "hidden",
                    "&:before": {
                      display: "none",
                    },
                    "&.Mui-expanded": {
                      margin: 0,
                    },
                  }}>
                  <AccordionSummary
                    expandIcon={<AddIcon sx={{ color: "#1f1f1f", fontSize: 28 }} />}
                    sx={{
                      px: { xs: 2.5, md: 3 },
                      py: 1.25,
                      minHeight: 82,
                      alignItems: "center",
                      "& .MuiAccordionSummary-content": {
                        my: 1,
                      },
                      "&.Mui-expanded": {
                        minHeight: 82,
                      },
                      "& .MuiAccordionSummary-content.Mui-expanded": {
                        my: 1,
                      },
                    }}>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: "#1f1f1f",
                        fontSize: { xs: "1rem", md: "1.05rem" },
                      }}>
                      {item.question}
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails
                    sx={{
                      px: { xs: 2.5, md: 3 },
                      pt: 0,
                      pb: 3,
                      borderTop: "1px solid #d8d0d2",
                      bgcolor: "#fff",
                    }}>
                    <Typography
                      sx={{
                        color: "#4f4a4b",
                        lineHeight: 1.9,
                        maxWidth: "95%",
                      }}>
                      {item.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
            ))}
          </Stack>
          <Box sx={{ textAlign: "center", mt: 7 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#1f1f1f", mb: 1.5 }}>
              Ainda tem dúvidas?
            </Typography>

            <Typography
              sx={{
                color: "#5b5560",
                mb: 3,
                lineHeight: 1.8,
              }}>
              Consulte a seção de contato para falar com os setores responsáveis e obter mais orientações sobre o
              estágio.
            </Typography>

            <Button
              component="a"
              href="/home#contato"
              variant="contained"
              sx={{
                bgcolor: "#8b1e2d",
                color: "#fff",
                px: 3.5,
                py: 1.3,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 700,
                "&:hover": {
                  bgcolor: "#6e1622",
                },
              }}>
              Ir para contato
            </Button>
          </Box>
        </Container>
      </Box>
      <Box
        id="contato"
        sx={{
          py: { xs: 8, md: 10 },
          bgcolor: "#f9f6f7",
          borderTop: "1px solid #efe2e4",
        }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="overline"
              sx={{
                color: "#8b1e2d",
                fontWeight: 700,
                letterSpacing: 1.2,
              }}>
              Contato
            </Typography>

            <Typography variant="h4" sx={{ fontWeight: 800, mt: 1.5, mb: 2, color: "#1f1f1f" }}>
              Informações institucionais da Fatec Atibaia
            </Typography>

            <Typography
              sx={{
                color: "#5b5560",
                maxWidth: 820,
                mx: "auto",
                lineHeight: 1.8,
              }}></Typography>
          </Box>

          <Grid container spacing={3}>
            {contactCards.map((item) => (
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
    </Box>
  );
}
