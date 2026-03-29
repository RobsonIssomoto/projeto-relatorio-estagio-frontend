import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Card,
  CardActionArea,
  Divider,
} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import BusinessIcon from "@mui/icons-material/Business";

export default function Cadastro() {
  const [etapa, setEtapa] = useState<"selecao" | "estagiario" | "empresa">(
    "selecao",
  );

  // --- TELA 1: SELEÇÃO DE PERFIL ---
  if (etapa === "selecao") {
    return (
      // Reduzimos de "md" para "sm" para aproximar os cartões
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
          {/* Reduzimos de h5 para h6 */}
          <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
            Qual é o seu perfil?
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 3,
              justifyContent: "center",
              flexWrap: "wrap",
            }}>
            {/* Cartões mais estreitos (220px) e com padding menor */}
            <Card
              sx={{
                width: 220,
                border: "1px solid transparent",
                "&:hover": { borderColor: "primary.main" },
              }}>
              <CardActionArea
                onClick={() => setEtapa("estagiario")}
                sx={{ p: 2, height: "100%" }}>
                {/* Ícones reduzidos de 60 para 40 */}
                <SchoolIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="subtitle1" fontWeight="bold">
                  ESTAGIÁRIO
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1, fontSize: "0.8rem" }}>
                  Sou aluno e vou enviar e acompanhar meus documentos de
                  estágio.
                </Typography>
              </CardActionArea>
            </Card>

            <Card
              sx={{
                width: 220,
                border: "1px solid transparent",
                "&:hover": { borderColor: "success.main" },
              }}>
              <CardActionArea
                onClick={() => setEtapa("empresa")}
                sx={{ p: 2, height: "100%" }}>
                <BusinessIcon color="success" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="subtitle1" fontWeight="bold">
                  EMPRESA
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1, fontSize: "0.8rem" }}>
                  Somos uma empresa e vamos gerenciar a documentação dos nossos
                  estagiários.
                </Typography>
              </CardActionArea>
            </Card>
          </Box>
        </Paper>
      </Container>
    );
  }

  // --- TELA 2: FORMULÁRIO DO ESTAGIÁRIO ---
  if (etapa === "estagiario") {
    return (
      <Container maxWidth="xs">
        <Paper
          elevation={3}
          sx={{ p: 4, display: "flex", flexDirection: "column" }}>
          <Typography
            component="h1"
            variant="h6"
            align="center"
            sx={{ fontWeight: "bold", mb: 1 }}>
            CADASTRO DE ESTAGIÁRIO
          </Typography>

          {/* Reduzimos o gap entre os inputs */}
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Divider sx={{ my: 0.5 }}>
              <Typography variant="caption" color="text.secondary">
                Dados Pessoais
              </Typography>
            </Divider>
            {/* Adicionamos size="small" em TODOS os TextFields */}
            <TextField label="Nome completo" required fullWidth size="small" />
            <TextField
              label="CPF sem pontos e traços"
              required
              fullWidth
              size="small"
            />
            <TextField label="Telefone" required fullWidth size="small" />
            <TextField
              label="E-mail"
              type="email"
              required
              fullWidth
              size="small"
            />
            <TextField
              label="Senha"
              type="password"
              required
              fullWidth
              size="small"
            />
            <TextField
              label="Confirme sua senha"
              type="password"
              required
              fullWidth
              size="small"
            />

            {/* Tiramos o size="large" para acompanhar o tamanho dos inputs */}
            <Button variant="contained" color="primary" sx={{ mt: 1 }}>
              Cadastrar
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => setEtapa("selecao")}>
              Cancelar
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  // --- TELA 3: FORMULÁRIO DA EMPRESA ---
  if (etapa === "empresa") {
    return (
      <Container maxWidth="xs">
        <Paper
          elevation={3}
          sx={{ p: 4, display: "flex", flexDirection: "column" }}>
          <Typography
            component="h1"
            variant="h6"
            align="center"
            sx={{ fontWeight: "bold", mb: 1 }}>
            CADASTRO DE EMPRESA
          </Typography>

          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Divider sx={{ my: 0.5 }}>
              <Typography variant="caption" color="text.secondary">
                Dados da Empresa
              </Typography>
            </Divider>
            <TextField label="Razão Social" required fullWidth size="small" />
            <TextField
              label="CNPJ (apenas números)"
              required
              fullWidth
              size="small"
            />

            <Divider sx={{ my: 0.5 }}>
              <Typography variant="caption" color="text.secondary">
                Dados do Representante
              </Typography>
            </Divider>
            <TextField
              label="Nome do Representante"
              required
              fullWidth
              size="small"
            />
            <TextField label="Telefone" required fullWidth size="small" />
            <TextField
              label="E-mail"
              type="email"
              required
              fullWidth
              size="small"
            />
            <TextField
              label="Senha"
              type="password"
              required
              fullWidth
              size="small"
            />
            <TextField
              label="Confirme sua senha"
              type="password"
              required
              fullWidth
              size="small"
            />

            <Button variant="contained" color="primary" sx={{ mt: 1 }}>
              Cadastrar
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => setEtapa("selecao")}>
              Cancelar
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  return null;
}
