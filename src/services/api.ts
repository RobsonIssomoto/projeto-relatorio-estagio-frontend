import axios from "axios";

//Instância da API (O Carteiro)
export const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
});
