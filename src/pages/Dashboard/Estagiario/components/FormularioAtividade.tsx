import { useState, useEffect } from "react";
import { useNavigate, useParams, Link as RouterLink } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { isAxiosError } from "axios";
import { Box, Button, Paper, TextField, Typography, Autocomplete, Chip } from "@mui/material";
import { api } from "../../../../services/api";
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
  const navigate = useNavigate();
  const { id } = useParams(); // Pega o ':id' da URL (se existir)
  const [buscandoDados, setBuscandoDados] = useState(!!id);
  // Estado para controlar se o botão está girando
  const [isLoading, setLoading] = useState(false);

  // Estado do Alerta
  const [alerta, setAlerta] = useState({ open: false, mensagem: "", tipo: "success" as "success" | "error" });

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

  // EFEITO: Se tiver um ID na URL, busca no banco e preenche a tela
  useEffect(() => {
    if (id) {
      const buscarAtividade = async () => {
        try {
          const resposta = await api.get(`/api/v1/atividades/${id}`);
          const dadosDoBanco = resposta.data;

          reset({
            titulo: dadosDoBanco.titulo,
            dataAtividade: dadosDoBanco.dataAtividade ? dadosDoBanco.dataAtividade.split("T")[0] : "",
            horas: dadosDoBanco.horas,
            tecnologias: dadosDoBanco.tecnologias || [],
            descricao: dadosDoBanco.descricao,
          });
        } catch (error) {
          console.error("Erro ao buscar atividade:", error);
          setAlerta({ open: true, mensagem: "Erro ao carregar dados da atividade", tipo: "error" });
        } finally {
          // Independente de dar erro ou sucesso, avisa que parou de buscar!
          setBuscandoDados(false);
        }
      };

      buscarAtividade();
    }
  }, [id, reset]); // Roda essa função sempre que o ID mudar

  // 3. Função disparada apenas se o formulário passar nas validações

  const onSubmit = async (dados: AtividadeFormData) => {
    setLoading(true);

    try {
      const pacoteParaOBanco = {
        titulo: dados.titulo,
        dataAtividade: dados.dataAtividade,
        horas: dados.horas,
        tecnologias: dados.tecnologias,
        descricao: dados.descricao,
        alunoId: "69e5a714881701b1b1318e8d", // Manter mock por enquanto
      };

      // DECISÃO DO SISTEMA: Editar ou Criar?
      if (id) {
        // Se tem ID, é MODO EDIÇÃO (Faz um PUT)
        await api.put(`/api/v1/atividades/${id}`, pacoteParaOBanco);
        setAlerta({ open: true, mensagem: "Atividade atualizada com sucesso!", tipo: "success" });
      } else {
        // Se NÃO tem ID, é MODO CRIAÇÃO (Faz um POST)
        await api.post("/api/v1/atividades", pacoteParaOBanco);
        setAlerta({ open: true, mensagem: "Atividade salva com sucesso!", tipo: "success" });
      }

      // Redireciona de volta para a tabela após 1 segundos
      setTimeout(() => navigate("/dashboard/atividades"), 1000);
    } catch (error: unknown) {
      console.error(error);

      // Mensagem padrão caso a internet caia totalmente
      let mensagemErro = "Erro interno de conexão.";

      // TYPE GUARD: Confirma com segurança que o erro veio do Axios
      if (isAxiosError(error)) {
        // Pega a mensagem exata que o seu Controller do Node enviou ({ erro: "..." })
        mensagemErro = error.response?.data?.erro || "Erro na comunicação com o servidor.";
      }

      // Aciona o alerta vermelho com a mensagem correta
      setAlerta({ open: true, mensagem: mensagemErro, tipo: "error" });
    } finally {
      setLoading(false);
    }
    // Limpa os campos após enviar
    //reset();
  };

  if (buscandoDados) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 5 }}>
        <Typography color="text.secondary">Carregando dados da atividade...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: { xs: 2, md: 4 } }}>
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 600, mt: 4 }}>
        {/* Título com cor customizada */}
        <Typography variant="h5" color="fatec.main" gutterBottom fontWeight="bold">
          Registrar Nova Atividade
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Descreva as tarefas realizadas e as tecnologias utilizadas.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading} // <--  Desliga o botão se estiver carregando
              sx={{ width: { xs: "100%", sm: "120px" } }}>
              {isLoading ? "Salvando..." : "Salvar"} {/* <-- Muda o texto */}
            </Button>

            <Button
              component={RouterLink}
              to="/dashboard/atividades"
              variant="outlined"
              color="inherit"
              sx={{ width: { xs: "100%", sm: "120px" } }}>
              Cancelar
            </Button>
          </Box>
        </Box>

        {/* 5. AlertaFeedback */}
        <AlertaFeedback
          open={alerta.open}
          mensagem={alerta.mensagem}
          tipo={alerta.tipo}
          onClose={() => setAlerta({ ...alerta, open: false })}
        />
      </Paper>
    </Box>
  );
}
