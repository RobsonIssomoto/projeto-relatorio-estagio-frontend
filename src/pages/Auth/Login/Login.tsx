import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CampoSenha } from "@/components/Common/CampoSenha";
import { api } from "@/services/api";

// Componentes do Material UI
import { Container, Box, Typography, TextField, Button, Paper, Alert } from "@mui/material";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { isAxiosError } from "axios";

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

  const { login } = useAuth();

  const onSubmit = async (dados: LoginData) => {
    try {
      setErroLogin(null); // Limpa o erro ao tentar logar de novo

      const resposta = await api.post("/auth/login", {
        Email: dados.email,
        Senha: dados.senha,
      });

      const { token, usuario } = resposta.data;

      login(token, usuario);

      console.log("Login efetuado com sucesso!", usuario);
      navigate("/dashboard");

      console.log("Login efetuado com sucesso!", usuario);

      // Usando o número direto é mais seguro e limpo
      const perfil = usuario.Perfil;

      if (perfil === 2) {
        navigate("/dashboard/estagiario");
      } else if (perfil === 3) {
        navigate("/dashboard/empresa");
      } else if (perfil === 4) {
        navigate("/dashboard/supervisor"); // A nova rota do seu Seed!
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      if (isAxiosError(error) && error.response) {
        setErroLogin(error.response.data?.erro || "E-mail ou senha incorretos.");
      } else {
        setErroLogin("Erro de conexão com o servidor. Tente novamente.");
      }
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
