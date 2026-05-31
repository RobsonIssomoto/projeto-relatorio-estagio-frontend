import { useState, useEffect } from "react";
import { Box, Typography, Paper, Avatar, Stack } from "@mui/material";
import { api } from "../../../../services/api";
import { GraficoHoras } from "../Atividades/GraficoHoras";

// Ícones
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface IAtividade {
  _id: string;
  horas: number;
  dataAtividade: string;
  tecnologias?: string[];
}

interface CardMetricaProps {
  titulo: string;
  valor: string | number;
  subtitulo: string;
  icone: React.ReactNode;
  corIcone: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  tendencia?: string;
  tipoTendencia?: "positiva" | "negativa" | "neutra";
}

// COMPONENTE DO CARD
const CardMetrica = ({ titulo, valor, subtitulo, icone, corIcone, tendencia, tipoTendencia }: CardMetricaProps) => (
  <Paper
    elevation={0} //  Sombra pesada removida para ficar mais "clean"
    sx={{
      p: 3,
      borderRadius: 2,
      border: "1px solid",
      borderColor: "divider", // Borda sutil
    }}>
    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
      <Box>
        <Typography variant="overline" color="text.secondary" fontWeight="600" sx={{ letterSpacing: 0.5 }}>
          {titulo}
        </Typography>
        <Typography variant="h4" fontWeight="bold" sx={{ mt: 0.5, mb: 1 }}>
          {valor}
        </Typography>
      </Box>

      {/* Ícone Circular no canto superior direito */}
      <Avatar sx={{ bgcolor: `${corIcone}.light`, color: `${corIcone}.main`, width: 48, height: 48 }}>{icone}</Avatar>
    </Stack>

    {/* Rodapé do Card com o indicador de tendência */}
    <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2 }}>
      {tendencia && (
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.5}
          color={
            tipoTendencia === "positiva" ? "success.main" : tipoTendencia === "negativa" ? "error.main" : "warning.main"
          }>
          {tipoTendencia === "positiva" ? (
            <ArrowUpwardIcon fontSize="small" />
          ) : tipoTendencia === "negativa" ? (
            <ArrowDownwardIcon fontSize="small" />
          ) : null}
          <Typography variant="body2" fontWeight="bold">
            {tendencia}
          </Typography>
        </Stack>
      )}
      <Typography variant="caption" color="text.secondary">
        {subtitulo}
      </Typography>
    </Stack>
  </Paper>
);

export const DashboardEstagiario = () => {
  // 1. Estados para guardar as métricas reais
  const [totalHoras, setTotalHoras] = useState(0);
  const [totalAtividades, setTotalAtividades] = useState(0);
  const [atividadesRecentes, setAtividadesRecentes] = useState(0);
  const [dadosGrafico, setDadosGrafico] = useState<{ nome: string; valor: number }[]>([]);
  // 2. Busca os dados no banco assim que o Dashboard abre
  useEffect(() => {
    const calcularMetricas = async () => {
      try {
        const resposta = await api.get("/api/v1/atividades/aluno");

        // Tipa a lista para o TS
        const lista: IAtividade[] = resposta.data;

        // 1. Total de Atividades
        setTotalAtividades(lista.length);

        // 2. Soma de Horas
        const somaDasHoras = lista.reduce((acumulador: number, atividade: IAtividade) => {
          return acumulador + (atividade.horas || 0); // Prevenção caso venha vazio
        }, 0);
        setTotalHoras(somaDasHoras);

        // 3. Lógica para "Atividades nesta semana"
        const dataLimite = new Date();
        dataLimite.setDate(dataLimite.getDate() - 7); // Volta 7 dias no tempo

        const feitasRecentemente = lista.filter((ativ) => {
          const dataDaAtividade = new Date(ativ.dataAtividade);
          return dataDaAtividade >= dataLimite;
        });
        setAtividadesRecentes(feitasRecentemente.length);

        // 4. LÓGICA DO GRÁFICO: Contar as tecnologias utilizadas
        const contagemTechs: Record<string, number> = {};

        lista.forEach((ativ) => {
          if (ativ.tecnologias && Array.isArray(ativ.tecnologias)) {
            ativ.tecnologias.forEach((tech) => {
              contagemTechs[tech] = (contagemTechs[tech] || 0) + 1;
            });
          }
        });

        // Transforma o objeto { HTML: 1, CSS: 1 } no formato que o Recharts pede
        // Formata para o Recharts (BLINDADO CONTRA ERROS NaN)
        const dadosFormatados = Object.keys(contagemTechs)
          .map((key) => ({
            nome: key,
            valor: Number(contagemTechs[key]), // Força a ser número (Number)
          }))
          .filter((item) => item.valor > 0); // Remove qualquer um que seja 0

        console.log("DADOS PARA O GRÁFICO:", dadosFormatados);
        setDadosGrafico(dadosFormatados);
      } catch (error) {
        console.error("Erro ao calcular métricas:", error);
      }
    };

    calcularMetricas();
  }, []);

  // Variável que calcula a porcentagem (Limitada a 100% no máximo)
  const percentualMeta = Math.min(Math.round((totalHoras / 400) * 100), 100);

  return (
    <Box sx={{ p: 3, maxWidth: 1400, mx: "auto" }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight="bold" color="text.primary">
          Visão Geral
        </Typography>
      </Box>

      {/* CSS GRID PARA NÃO DEIXAR BURACOS */}
      <Stack spacing={8}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr", // Celular: 1 por linha (empilhados)
              md: "repeat(2, 1fr)", // Tablet/Desktop menor: 2 em cima, 2 embaixo
              xl: "repeat(4, 1fr)", // Desktop grande (monitor largo): 4 lado a lado
            },
            gap: 3,
          }}>
          <CardMetrica
            titulo="HORAS CUMPRIDAS"
            valor={`${totalHoras}h`}
            tendencia={`${percentualMeta}%`} /* CALCULA SOZINHO A PORCENTAGEM */
            tipoTendencia="positiva"
            subtitulo="da meta de 400h"
            icone={<AccessTimeFilledIcon />}
            corIcone="primary"
          />

          <CardMetrica
            titulo="ATIVIDADES ENVIADAS"
            valor={totalAtividades}
            tendencia={`+${atividadesRecentes}`} /* QUANTAS FORAM FEITAS NOS ÚLTIMOS 7 DIAS */
            tipoTendencia="positiva"
            subtitulo="nos últimos 7 dias"
            icone={<AssignmentTurnedInIcon />}
            corIcone="success"
          />

          <CardMetrica
            titulo="PENDÊNCIAS"
            valor="1"
            tendencia="Atenção"
            tipoTendencia="negativa"
            subtitulo="Relatório atrasado"
            icone={<WarningAmberIcon />}
            corIcone="error"
          />

          <CardMetrica
            titulo="DESEMPENHO"
            valor="9.5"
            tendencia="Excelente"
            tipoTendencia="positiva"
            subtitulo="Desempenho"
            icone={<TrendingUpIcon />}
            corIcone="info"
          />
        </Box>

        {/* =========================================================
        O espaço abaixo já está preparado para 
        receber os Gráficos 
        =========================================================
      */}
        <Box
          sx={{
            mt: 3,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          {/* Aqui entra o seu gráfico do Recharts! */}
          <GraficoHoras dados={dadosGrafico} />
        </Box>
      </Stack>
    </Box>
  );
};
