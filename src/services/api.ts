import axios from "axios";

//Instância da API (O Carteiro)
export const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
});

// O Interceptador: Acontece milissegundos ANTES de qualquer disparo do Axios
api.interceptors.request.use((config) => {
  // Busca o passaporte no cofre do navegador
  const token = localStorage.getItem("@FatecEstagio:token");

  // Se achou o passaporte, grampeia ele no cabeçalho da requisição
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/*Dica de Sênior: Usar o prefixo @NomeDoSeuApp: no localStorage evita que o seu token se misture com tokens de outros sites ou projetos que rodam no localhost. */