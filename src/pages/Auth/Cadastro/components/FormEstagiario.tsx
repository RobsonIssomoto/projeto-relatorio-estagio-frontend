import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Divider,
  InputAdornment,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

function CampoSenha({
  label,
  value,
  onChange,
  onBlur,
  onFocus,
  error,
  helperText,
}: {
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  error?: boolean;
  helperText?: string;
}) {
  // A memória de "mostrar/ocultar" fica DENTRO do componente.
  // Cada campo de senha criado terá o seu próprio olhinho independente!
  const [mostrar, setMostrar] = useState(false);

  return (
    <TextField
      label={label}
      type={mostrar ? "text" : "password"}
      required
      fullWidth
      size="small"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      error={error}
      helperText={helperText}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setMostrar(!mostrar)} edge="end">
                {mostrar ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

interface Props {
  setEtapa: (etapa: "selecao" | "estagiario" | "empresa") => void;
}

export default function FormEstagiario({ setEtapa }: Props) {
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [confirmacaoTocada, setConfirmacaoTocada] = useState(false);
  const regrasSenha = [
    { id: 1, texto: "Mínimo de 8 caracteres", valido: senha.length >= 8 },
    { id: 2, texto: "Pelo menos uma letra maiúscula", valido: /[A-Z]/.test(senha) },
    { id: 3, texto: "Pelo menos um número", valido: /\d/.test(senha) },
    { id: 4, texto: "Pelo menos um caractere especial (!@#$%)", valido: /[!@#$%^&*(),.?":{}|<>]/.test(senha) },
  ];
  const senhaValida = regrasSenha.every((regra) => regra.valido);
  const senhasConferem = senha === confirmarSenha && senha.length > 0;
  const erroConfirmacao = confirmacaoTocada && senha !== confirmarSenha && confirmarSenha.length > 0;
  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, display: "flex", flexDirection: "column" }}>
        <Typography component="h1" variant="h6" align="center" sx={{ fontWeight: "bold", mb: 1 }}>
          CADASTRO DE ESTAGIÁRIO
        </Typography>
        <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Divider sx={{ my: 0.5 }}>
            <Typography variant="caption" color="text.secondary">
              Dados Pessoais
            </Typography>
          </Divider>

          <TextField label="Nome completo" required fullWidth size="small" />
          <TextField label="CPF" required fullWidth size="small" />
          <TextField label="Telefone" required fullWidth size="small" />
          <TextField label="E-mail" type="email" required fullWidth size="small" />

          <CampoSenha label="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />

          <CampoSenha
            label="Confirme sua senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            onBlur={() => setConfirmacaoTocada(true)}
            error={erroConfirmacao} // Fica vermelho se for true
            onFocus={() => setConfirmacaoTocada(false)} // Clicou de volta no campo? Esquece que ele foi tocado e esconde o erro!
            helperText={erroConfirmacao ? "As senhas não conferem." : ""} // A mensagem em vermelho
          />

          {/* CHECKLIST */}
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

          <Button variant="contained" color="primary" sx={{ mt: 1 }} disabled={!senhaValida || !senhasConferem}>
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
