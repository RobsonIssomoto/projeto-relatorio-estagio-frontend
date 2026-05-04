import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Paper, TextField, Typography, CircularProgress } from "@mui/material";
import { api } from "../../../../services/api";
import { maskCPF, maskCNPJ, maskTelefone } from "../../../../utils/formatters";
import AlertaFeedback from "../../../../components/Common/AlertaFeedBack";

export const FormularioPerfil = () => {
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [alerta, setAlerta] = useState({ open: false, mensagem: "", tipo: "success" as "success" | "error" });

  const [formData, setFormData] = useState({
    Nome: "",
    Email: "",
    Telefone: "",
    CPF: "",
    CNPJ: "",
  });

  // Fecha o alerta automaticamente após 4 segundos
  const mostrarAlerta = (mensagem: string, tipo: "success" | "error") => {
    setAlerta({ open: true, mensagem, tipo });
    setTimeout(() => setAlerta((prev) => ({ ...prev, open: false })), 4000);
  };

  useEffect(() => {
    api
      .get("/usuarios/perfil")
      .then((res) => {
        const usuario = res.data;
        const perfil = usuario.Estagiarios?.[0] || usuario.Empresas?.[0] || {};

        setFormData({
          Nome: perfil.Nome || "",
          Email: usuario.Email || "",
          Telefone: perfil.Telefone ? maskTelefone(perfil.Telefone) : "",
          CPF: perfil.CPF ? maskCPF(perfil.CPF) : "",
          CNPJ: perfil.CNPJ ? maskCNPJ(perfil.CNPJ) : "",
        });
        setLoading(false);
      })
      .catch(() => {
        mostrarAlerta("Erro ao carregar dados", "error");
        setLoading(false);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let val = value;
    if (name === "Telefone") val = maskTelefone(value);
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSalvando(true);
    try {
      await api.put("/usuarios/perfil", formData);
      mostrarAlerta("Perfil atualizado com sucesso!", "success");
    } catch {
      mostrarAlerta("Erro ao atualizar perfil", "error");
    } finally {
      setSalvando(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minWidth: 500, maxWidth: 800, mx: "auto", p: { xs: 2, md: 4 } }}>
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 600, mt: 4 }}>
        <Typography variant="h5" color="fatec.main" gutterBottom fontWeight="bold">
          Meu Perfil
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Editar dados do perfil
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <TextField
            label="Nome Completo"
            name="Nome"
            value={formData.Nome}
            onChange={handleChange}
            fullWidth
            size="small"
            variant="outlined"
          />

          <TextField label="E-mail" value={formData.Email} fullWidth disabled size="small" variant="outlined" />

          {formData.CPF && (
            <TextField label="CPF" value={formData.CPF} fullWidth disabled size="small" variant="outlined" />
          )}

          {formData.CNPJ && (
            <TextField label="CNPJ" value={formData.CNPJ} fullWidth disabled size="small" variant="outlined" />
          )}

          <TextField
            label="Telefone"
            name="Telefone"
            value={formData.Telefone}
            onChange={handleChange}
            fullWidth
            size="small"
            variant="outlined"
            inputProps={{ maxLength: 15 }}
          />

          {/* Container de Botões idêntico ao FormularioAtividade */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 1,
              mt: 2,
              justifyContent: { sm: "flex-end" },
            }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={salvando}
              sx={{ width: { xs: "100%", sm: "120px" } }}>
              {salvando ? "Salvando..." : "Salvar"}
            </Button>

            <Button
              component={RouterLink}
              to="/dashboard/estagiario"
              variant="outlined"
              color="inherit"
              sx={{ width: { xs: "100%", sm: "120px" } }}>
              Cancelar
            </Button>
          </Box>
        </Box>
      </Paper>

      <AlertaFeedback
        open={alerta.open}
        mensagem={alerta.mensagem}
        tipo={alerta.tipo}
        onClose={() => setAlerta({ ...alerta, open: false })}
      />
    </Box>
  );
};
