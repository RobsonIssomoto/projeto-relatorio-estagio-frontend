// 1. Bibliotecas Externas
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";

// 2. Configurações de Tema e Layouts
import { theme } from "./theme/theme";
import { DashboardLayout } from "./layouts/DashboardLayouts";

// 3. Autenticação
import { Login } from "./pages/Auth/Login/Login";
import { Cadastro } from "./pages/Auth/Cadastro/components/Cadastro";

// 4. Dashboard e Atividades
import { DashboardEstagiario } from "./pages/Dashboard/Estagiario/Home/DashboardEstagiario";
import { Atividade } from "./pages/Dashboard/Estagiario/Atividades/Atividades";
import { TelaRegistroAtividade } from "./pages/Dashboard/Estagiario/Atividades/TelaRegistroAtividade";
import { Relatorios } from "./pages/Dashboard/Estagiario/Relatorios/Relatorios";

// 5. Componentes Globais
import { Navbar } from "./components/Navbar/Navbar";
/**
 * Esse é o "Molde" para as páginas públicas (Login e Cadastro).
 * Ele mantém as configurações de espaçamento e centralização
 */
const PublicLayout = () => (
  <>
    <Navbar />
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
      <Outlet /> {/* Aqui entram o Login ou o Cadastro */}
    </Box>
  </>
);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <Routes>
          {/* ========================================== */}
          {/* ROTAS PÚBLICAS (Com Navbar e Centralização) */}
          {/* ========================================== */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
          </Route>

          {/* ========================================== */}
          {/* ROTAS PRIVADAS (Com Menu Lateral / Sidebar) */}
          {/* ========================================== */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard/estagiario" element={<DashboardEstagiario />} />
            <Route path="/dashboard/atividades" element={<Atividade />} />
            <Route path="/dashboard/atividades/nova" element={<TelaRegistroAtividade />} />
            <Route path="/dashboard/atividades/editar/:id" element={<TelaRegistroAtividade />} />
            <Route path="/dashboard/relatorios" element={<Relatorios />} />

            <Route path="/dashboard/empresa" element={<h1>Painel Base da Empresa em construção 🚧</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
