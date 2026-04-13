import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CampoSenha } from "@/components/Common/CampoSenha";
import { api } from "@/services/api";

// Componentes do Material UI
import { Container, Box, Typography, TextField, Button, Paper, Alert } from "@mui/material";
import { useState } from "react";

interface LoginData {
  email: string;
  senha: string;
}

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();
  const navigate = useNavigate();

  // Estado para controlar mensagens de erro na tela
  const [erroLogin, setErroLogin] = useState<string | null>(null);

  const onSubmit = async (dados: LoginData) => {
    try {
      setErroLogin(null); // Limpa o erro ao tentar logar de novo

      const resposta = await api.post("/api/v1/auth/login", {
        email: dados.email,
        senha: dados.senha,
      });

      const { token, usuario } = resposta.data;

      localStorage.setItem("@FatecEstagio:token", token);
      localStorage.setItem("@FatecEstagio:usuario", JSON.stringify(usuario));

      console.log("Login efetuado com sucesso!", usuario);

      const perfil = String(usuario.perfil).toUpperCase();
      if (perfil === "ESTAGIARIO" || usuario.perfil === 2) {
        navigate("/dashboard/estagiario");
      } else if (perfil === "REPRESENTANTE" || usuario.perfil === 3) {
        navigate("/dashboard/empresa");
      } else {
        navigate("/dashboard");
      }
    } catch (erro) {
      console.error("Erro ao logar:", erro);
      setErroLogin("E-mail ou senha incorretos. Verifique e tente novamente.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ marginTop: 4, p: 4, display: "flex", flexDirection: "column" }}>
        <Typography component="h1" variant="h5" align="center" sx={{ fontWeight: "bold", mb: 3 }}>
          Login
        </Typography>

        {/* Alert do MUI para mensagens de erro  */}
        {erroLogin && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {erroLogin}
          </Alert>
        )}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <TextField
            label="E-mail"
            type="email"
            size="small"
            fullWidth
            id="email"
            autoComplete="email"
            autoFocus
            {...register("email", {
              required: "O E-mail é obrigatório",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Digite um e-mail válido (ex: seu@email.com)",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message as string}
          />

          <CampoSenha
            id="senha"
            label="Senha"
            error={!!errors.senha}
            helperText={errors.senha?.message as string}
            {...register("senha", { required: "A senha é obrigatória" })}
          />

          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Entrar
          </Button>

          <Button variant="outlined" color="inherit">
            Cancelar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
