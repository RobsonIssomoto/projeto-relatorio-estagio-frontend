import {
  Box,
  Container,
  Typography,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

const duvidas = [
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

export default function PerguntasFrequentes() {
  return (
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
          <Typography variant="overline" sx={{ color: "#8b1e2d", fontWeight: 700, letterSpacing: 1.2 }}>
            Perguntas frequentes
          </Typography>

          <Typography variant="h4" sx={{ fontWeight: 800, mt: 1.5, mb: 2, color: "#1f1f1f" }}>
            Tire suas dúvidas sobre o sistema
          </Typography>

          <Typography sx={{ color: "#5b5560", maxWidth: 680, mx: "auto", lineHeight: 1.8 }}>
            Reunimos respostas para as dúvidas mais comuns sobre cadastro, acesso, envio de atividades, relatórios e
            validações do estágio.
          </Typography>
        </Box>

        <Stack>
          {duvidas.map((item) => (
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
                  transition: "all 0.2s ease-in-out",
                  "&:before": {
                    display: "none",
                  },
                  "&.Mui-expanded": {
                    margin: 0,
                    borderColor: "#8b1e2d",
                    boxShadow: "0 4px 20px rgba(139, 30, 45, 0.08)",
                  },
                  "&:hover": {
                    borderColor: "#8b1e2d",
                    bgcolor: "#fffbfb",
                    cursor: "pointer",
                  },
                }}>
                <AccordionSummary
                  expandIcon={<AddIcon sx={{ color: "#1f1f1f", fontSize: 28 }} />}
                  sx={{
                    px: { xs: 2.5, md: 3 },
                    py: 1.25,
                    minHeight: 82,
                    alignItems: "center",
                    "& .MuiAccordionSummary-content": { my: 1 },
                    "&.Mui-expanded": { minHeight: 82 },
                  }}>
                  <Typography sx={{ fontWeight: 700, color: "#1f1f1f", fontSize: { xs: "1rem", md: "1.05rem" } }}>
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
                  <Typography sx={{ color: "#4f4a4b", lineHeight: 1.9, maxWidth: "95%" }}>{item.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          ))}
        </Stack>

        <Box sx={{ textAlign: "center", mt: 7 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: "#1f1f1f", mb: 1.5 }}>
            Ainda tem dúvidas?
          </Typography>

          <Typography sx={{ color: "#5b5560", mb: 3, lineHeight: 1.8 }}>
            Consulte a seção de contato para falar com os setores responsáveis e obter mais orientações sobre o estágio.
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
  );
}
