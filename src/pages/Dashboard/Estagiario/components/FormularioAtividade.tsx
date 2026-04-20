import { useState } from "react";
import { Box, Button, Paper, TextField, Typography, Autocomplete, Chip } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import AlertaFeedback from "../../../../components/Common/AlertaFeedBack";

// 1. Contrato do TypeScript para o Formulário
interface AtividadeFormData {
  titulo: string;
  dataAtividade: string;
  horas: number;
  tecnologias: string[];
  descricao: string;
}

export default function FormularioAtividade() {
  // Estado do Alerta
  const [alertaOpen, setAlertaOpen] = useState(false);

  // 2. Configuração do React Hook Form
  const {
    register,
    handleSubmit,
    control,
    reset, // Usado para limpar o formulário após salvar
    formState: { errors },
  } = useForm<AtividadeFormData>({
    defaultValues: {
      titulo: "",
      dataAtividade: "",
      horas: undefined,
      tecnologias: [],
      descricao: "",
    },
  });

  // 3. Função disparada apenas se o formulário passar nas validações
  const onSubmit = (dados: AtividadeFormData) => {
    console.log("🚀 Dados prontos para a API:", dados);

    // Abre o seu alerta de sucesso!
    setAlertaOpen(true);

    // Limpa os campos após enviar
    reset();
  };

  return (
    <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 600, mt: 4 }}>
      {/* Título com cor customizada */}
      <Typography variant="h5" color="fatec.main" gutterBottom fontWeight="bold">
        Registrar Nova Atividade
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Descreva as tarefas realizadas e as tecnologias utilizadas.
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* 1. Título da Atividade */}
        <TextField
          label="Título da Atividade"
          variant="outlined"
          placeholder="Ex: Desenvolvimento da Tela de Login"
          fullWidth
          size="small" // Seu ajuste de tamanho mantido
          {...register("titulo", { required: "O título é obrigatório" })}
          error={!!errors.titulo}
          helperText={errors.titulo?.message}
        />

        {/* 2. Data e Carga Horária */}
        <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, gap: 2 }}>
          <TextField
            label="Data"
            type="date"
            fullWidth
            size="small"
            slotProps={{ inputLabel: { shrink: true } }}
            {...register("dataAtividade", { required: "A data é obrigatória" })}
            error={!!errors.dataAtividade}
            helperText={errors.dataAtividade?.message}
          />
          <TextField
            label="Horas Trabalhadas"
            type="number"
            fullWidth
            size="small"
            placeholder="Ex: 4"
            {...register("horas", {
              required: "A carga horária é obrigatória",
              min: { value: 1, message: "Mínimo de 1 hora" },
              max: { value: 8, message: "Máximo de 8 horas por dia" },
            })}
            error={!!errors.horas}
            helperText={errors.horas?.message}
          />
        </Box>

        {/* 3. Autocomplete para Tecnologias (Integrado ao RHF com Controller) */}
        <Controller
          name="tecnologias"
          control={control}
          rules={{ required: "Adicione pelo menos uma tecnologia" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Autocomplete
              multiple
              freeSolo
              size="small"
              options={["React", "Node.js", "MongoDB", "TypeScript", "Figma"]}
              value={value}
              onChange={(_, newValue) => onChange(newValue)}
              renderValue={(val: readonly string[], getItemProps) =>
                val.map((option: string, index: number) => {
                  const { key, ...otherProps } = getItemProps({ index });
                  return <Chip key={key} variant="filled" label={option} {...otherProps} color="primary" />;
                })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tecnologias / Habilidades"
                  placeholder="Digite e aperte Enter"
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
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
          {...register("descricao", {
            required: "A descrição é obrigatória",
            minLength: { value: 15, message: "Escreva pelo menos 15 caracteres" },
          })}
          error={!!errors.descricao}
          helperText={errors.descricao?.message}
        />

        {/* Container responsivo para os botões (Seu layout mantido!) */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 1,
            mt: 2,
            justifyContent: { sm: "flex-end" },
          }}>
          {/* type="submit" para disparar o React Hook Form */}
          <Button type="submit" variant="contained" color="primary" sx={{ width: { xs: "100%", sm: "120px" } }}>
            Salvar
          </Button>

          <Button variant="outlined" color="inherit" sx={{ width: { xs: "100%", sm: "120px" } }}>
            Cancelar
          </Button>
        </Box>
      </Box>

      {/* 5. AlertaFeedback */}
      <AlertaFeedback
        open={alertaOpen}
        mensagem="Atividade registrada com sucesso!"
        tipo="success"
        onClose={() => setAlertaOpen(false)}
      />
    </Paper>
  );
}
