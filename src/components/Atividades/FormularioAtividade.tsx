import { useState } from "react";
import { Box, Button, Paper, TextField, Typography, Autocomplete, Chip } from "@mui/material";
import AlertaFeedback from "../Common/AlertaFeedBack";

export default function FormularioAtividade() {
  const [alertaOpen, setAlertaOpen] = useState(false);

  const handleSalvarMock = () => {
    setAlertaOpen(true);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 600 , mt: 4 }}>
      <Typography variant="h5" color="fatec.main" gutterBottom fontWeight="bold">
        Registrar Nova Atividade
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Descreva as tarefas realizadas e as tecnologias utilizadas.
      </Typography>

      <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* 1. Título da Atividade */}
        <TextField
          label="Título da Atividade"
          variant="outlined"
          placeholder="Ex: Desenvolvimento da Tela de Login"
          fullWidth
          size="small"
        />

        {/* 2. Data e Carga Horária */}
        <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, gap: 2 }}>
          <TextField label="Data" type="date" fullWidth size="small" slotProps={{ inputLabel: { shrink: true } }} />
          <TextField label="Horas Trabalhadas" type="number" fullWidth size="small" placeholder="Ex: 4" />
        </Box>
        {/* 3. Autocomplete para Tecnologias */}
        <Autocomplete
          multiple
          freeSolo
          size="small"
          options={["React", "Node.js", "MongoDB", "TypeScript", "Figma"]}
          renderValue={(value: readonly string[], getItemProps) =>
            value.map((option: string, index: number) => {
              const { key, ...otherProps } = getItemProps({ index });
              return <Chip key={key} variant="filled" label={option} {...otherProps} />;
            })
          }
          renderInput={(params) => (
            <TextField {...params} label="Tecnologias / Habilidades" placeholder="Digite e aperte Enter" />
          )}
        />

        {/* 4. Descrição */}
        <TextField
          label="Descrição do que foi feito"
          multiline
          rows={5}
          placeholder="Descreva os detalhes da sua tarefa..."
          fullWidth
          size="small"
        />

        {/* Container responsivo para os botões */}
        <Box
          sx={{
            display: "flex",
            // 'column' no celular (xs), 'row' no desktop (sm)
            flexDirection: { xs: "column", sm: "row" },
            gap: 1,
            mt: 2,
            // Alinha à direita no desktop, fica normal no celular
            justifyContent: { sm: "flex-end" },
          }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSalvarMock}
            sx={{ width: { xs: "100%", sm: "120px" } }}>
            Salvar
          </Button>

          <Button variant="outlined" color="inherit" sx={{ width: { xs: "100%", sm: "120px" } }}>
            Cancelar
          </Button>
        </Box>
      </Box>
      {/* 5. Alerta no final do componente, passando as Props! */}
      <AlertaFeedback
        open={alertaOpen}
        mensagem="Atividade registrada com sucesso!"
        tipo="success"
        onClose={() => setAlertaOpen(false)}
      />
    </Paper>
  );
}
