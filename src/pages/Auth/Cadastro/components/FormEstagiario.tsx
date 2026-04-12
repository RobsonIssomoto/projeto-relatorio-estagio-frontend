import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CampoSenha } from "@/components/Common/CampoSenha";
import { maskTelefone, maskCPF, validarCPF } from "@/utils/formatters";
import { Box, Button, Container, Paper, TextField, Typography, Divider } from "@mui/material";
import { api } from "@/services/api";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

interface Props {
  setEtapa: (etapa: "selecao" | "estagiario" | "empresa") => void;
}

// O "RG" dos nossos dados do formulário
interface EstagiarioData {
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}

export default function FormEstagiario({ setEtapa }: Props) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    control,
    reset,
    trigger,
    formState: { errors },
  } = useForm<EstagiarioData>({
    mode: "onTouched",
  });

  const onSubmit = async (dados: EstagiarioData) => {
    try {
      console.log("Sucesso!O RHF empacotou tudo", dados);

      const payloadParaOBackend = {
        nome: dados.nome,
        cpf: dados.cpf,
        telefone: dados.telefone,
        email: dados.email,
        senhaEmTextoPlano: dados.senha,
        perfil: "ESTAGIARIO",
      };

      console.log("Enviando para o Node:", payloadParaOBackend);

      //Axios entra aqui
      const resposta = await api.post("/api/v1/usuarios", payloadParaOBackend);

      console.log("Servidor respondeu com sucesso", resposta.data);
      alert("Cadastro realizado com sucesso");
      reset(); // Limpa todos os campos do formulário
      navigate("/login"); // Direciona o usuário para a tela de login
    } catch (erro) {
      console.error("Erro de requisição", erro);
      alert("Ocorreu um erro ao cadastrar");
    }
  };

  const senhaAtual = useWatch({ control, name: "senha" }) || "";
  const confirmaSenhaAtual = useWatch({ control, name: "confirmarSenha" }) || "";

  useEffect(() => {
    // Se o usuário já começou a digitar algo na confirmação,
    // força o RHF a reavaliar se as senhas continuam iguais.
    if (getValues("confirmarSenha")) {
      trigger("confirmarSenha");
    }
  }, [senhaAtual, trigger, getValues]);

  const regrasSenha = [
    { id: 1, texto: "Mínimo de 8 caracteres", valido: senhaAtual.length >= 8 },
    { id: 2, texto: "Pelo menos uma letra maiúscula", valido: /[A-Z]/.test(senhaAtual) },
    { id: 3, texto: "Pelo menos um número", valido: /\d/.test(senhaAtual) },
    { id: 4, texto: "Pelo menos um caractere especial (!@#$%)", valido: /[!@#$%^&*(),.?":{}|<>]/.test(senhaAtual) },
  ];
  const senhaValida = regrasSenha.every((regra) => regra.valido);
  const senhasConferem = senhaAtual === confirmaSenhaAtual && senhaAtual.length > 0;

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, display: "flex", flexDirection: "column" }}>
        <Typography component="h1" variant="h6" align="center" sx={{ fontWeight: "bold", mb: 1 }}>
          CADASTRO DE ESTAGIÁRIO
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Divider sx={{ my: 0.5 }}>
            <Typography variant="caption" color="text.secondary">
              Dados Pessoais
            </Typography>
          </Divider>

          <TextField
            label="Nome completo"
            size="small"
            {...register("nome", {
              required: "O nome é obrigatório",
              pattern: {
                value: /^[a-zA-ZÀ-ÿ\s]+$/,
                message: "O nome não pode conter números",
              },
            })}
            slotProps={{
              htmlInput: {
                maxLength: 100,
              },
            }}
            error={!!errors.nome}
            helperText={errors.nome?.message as string}
          />

          <TextField
            label="CPF"
            size="small"
            {...register("cpf", {
              required: "O CPF é obrigatório",
              validate: (value) => validarCPF(value) || "Este CPF não é válido", // Usa o algoritmo!
              onChange: (e) => {
                e.target.value = maskCPF(e.target.value);
              }, // Aplica a máscara enquanto digita
            })}
            error={!!errors.cpf}
            helperText={errors.cpf?.message as string}
          />

          <TextField
            label="Telefone"
            size="small"
            {...register("telefone", {
              required: "Telefone é obrigatório",
              minLength: { value: 14, message: "Digite o telefone completo" },
              onChange: (e) => {
                e.target.value = maskTelefone(e.target.value);
              },
            })}
            error={!!errors.telefone}
            helperText={errors.telefone?.message as string}
          />

          <TextField
            label="E-mail"
            type="email"
            size="small"
            {...register("email", {
              required: "E-mail obrigatório",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Digite um e-mail válido (ex: seu@email.com)",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message as string}
          />

          <CampoSenha label="Senha" {...register("senha", { required: "Crie uma senha" })} />

          <CampoSenha
            label="Confirme sua senha"
            {...register("confirmarSenha", {
              validate: (value) => value === getValues("senha") || "As senhas não conferem", // Regra direta no RHF!
            })}
            error={!!errors.confirmarSenha}
            helperText={errors.confirmarSenha?.message as string}
          />

          {/* CHECKLIST VISUAL */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, px: 1 }}>
            {regrasSenha.map((regra) => (
              <Typography
                key={regra.id}
                variant="caption"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: regra.valido ? "success.main" : "text.secondary",
                  transition: "color 0.3s ease",
                }}>
                {regra.valido ? (
                  <CheckCircleIcon sx={{ fontSize: 16, mr: 1 }} />
                ) : (
                  <RadioButtonUncheckedIcon sx={{ fontSize: 16, mr: 1 }} />
                )}
                {regra.texto}
              </Typography>
            ))}
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 1 }}
            disabled={!senhaValida || !senhasConferem}>
            Cadastrar
          </Button>

          <Button variant="outlined" color="inherit" onClick={() => setEtapa("selecao")}>
            Cancelar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
