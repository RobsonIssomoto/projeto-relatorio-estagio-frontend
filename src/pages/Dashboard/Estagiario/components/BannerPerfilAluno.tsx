import { Box, Divider, Paper, Typography, Grid, Chip } from "@mui/material";

// Importação dos Ícones para enriquecer o visual
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SchoolIcon from "@mui/icons-material/School";
import BadgeIcon from "@mui/icons-material/Badge";
import BusinessIcon from "@mui/icons-material/Business";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NightsStayIcon from "@mui/icons-material/NightsStay";

interface ItemDadoProps {
  icone: React.ReactNode;
  titulo: string;
  valor: string | number;
  corValor?: string;
}
// 🛠️ MINI-COMPONENTE INTERNO: Padroniza a exibição de cada bloco de dado com um ícone
const ItemDado = ({ icone, titulo, valor, corValor = "text.primary" }: ItemDadoProps) => (
  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
    <Box sx={{ mt: 0.5, color: "text.secondary" }}>{icone}</Box>
    <Box>
      <Typography variant="caption" color="text.secondary" display="block">
        {titulo}
      </Typography>
      <Typography variant="body2" fontWeight="600" color={corValor}>
        {valor}
      </Typography>
    </Box>
  </Box>
);

export default function BannerPerfilAluno() {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        width: "100%",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        gap: 3,
      }}>
      {/* 1. SEÇÃO ESQUERDA: DADOS ACADÊMICOS E INSTITUCIONAIS */}
      <Grid container spacing={3} sx={{ flexGrow: 1 }}>
        {/* Coluna 1: Informações Maiores (Curso e Unidade) */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <ItemDado icone={<SchoolIcon />} titulo="Curso" valor="Desenvolvimento de Software Multiplataforma" />
          <ItemDado icone={<BusinessIcon />} titulo="Unidade" valor="Fatec Atibaia" />
        </Grid>

        {/* Coluna 2: Detalhes do Aluno (RA, Semestre, Turno e Status) */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          {/* Box para alinhar RA, Semestre e Turno lado a lado */}
          <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            <ItemDado icone={<BadgeIcon />} titulo="RA" valor="3081392423008" />
            <ItemDado icone={<CalendarMonthIcon />} titulo="Semestre" valor="5º Semestre" />
            <ItemDado icone={<NightsStayIcon />} titulo="Turno" valor="Noite" />
          </Box>

          <ItemDado
            icone={<CheckCircleIcon color="success" />}
            titulo="Status SIGA"
            valor="Em Curso"
            corValor="success.main"
          />
        </Grid>
      </Grid>

      {/* Divisória inteligente: some no celular, vira vertical no PC */}
      <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" } }} />
      <Divider sx={{ width: "100%", display: { xs: "block", md: "none" } }} />

      {/* 2. SEÇÃO DIREITA: STATUS DO ESTÁGIO */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: { md: "200px" }, gap: 1 }}>
        <Typography variant="caption" color="text.secondary" fontWeight="bold">
          Progresso do Estágio
        </Typography>
        <Chip
          icon={<AccessTimeIcon />}
          label="142 Horas"
          color="primary"
          sx={{ fontWeight: "bold", fontSize: "1.1rem", py: 2.5, px: 2 }}
        />
        <Typography variant="caption" color="text.secondary">
          SGR Tecnologia
        </Typography>
      </Box>
    </Paper>
  );
}
