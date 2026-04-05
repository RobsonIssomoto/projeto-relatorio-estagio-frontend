import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { theme } from "./theme/theme";
import Navbar from "./components/Navbar/Navbar";
import Cadastro from "./pages/Auth/Cadastro/components/Cadastro";
import { Login } from "./pages/Auth/Login/Login";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* 3. O BrowserRouter ABRAÇA a Navbar e as Rotas */}
      <BrowserRouter>
        <Navbar />

        {/* Container Principal da Aplicação */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            pt: "112px",
            pb: "40px",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f5f7fa",
          }}>
          {/* 4. A mágica acontece aqui: As rotas dinâmicas! */}
          <Routes>
            {/* Quando a URL for /login, mostra a tela de Login */}
            <Route path="/login" element={<Login />} />

            <Route path="/cadastro" element={<Cadastro />} />

            {/* Quando a URL for a de cadastro, mostra o Cadastro 
            <Route path="/cadastro/estagiario" element={<Cadastro />} />
            <Route path="/cadastro/empresa" element={<Cadastro />} />*/}

            <Route path="/dashboard/estagiario" element={<h1>Painel do Estagiário em construção 🚧</h1>} />
            <Route path="/dashboard/empresa" element={<h1>Painel da Empresa em construção 🚧</h1>} />

            {/* Rota padrão (Home) - Temporariamente caindo no login */}
            <Route path="/" element={<Login />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}
