import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { theme } from "./theme/theme";

// Componentes
import Navbar from "./components/Navbar/Navbar";
import Cadastro from "./pages/Auth/Cadastro/components/Cadastro";
import TelaRegistroAtividade from "./pages/Dashboard/Estagiario/Atividades/TelaRegistroAtividade";
import DashboardEstagiario from "./pages/Dashboard/Estagiario/DashboardEstagiario";
import { Login } from "./pages/Auth/Login/Login";
import { DashboardLayout } from "./layouts/DashboardLayouts";

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
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/" element={<Login />} />
          </Route>

          {/* ========================================== */}
          {/* ROTAS PRIVADAS (Com Menu Lateral / Sidebar) */}
          {/* ========================================== */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard/estagiario" element={<DashboardEstagiario />} />
            <Route path="/dashboard/atividades/nova" element={<TelaRegistroAtividade />} />
            <Route path="/dashboard/empresa" element={<h1>Painel Base da Empresa em construção 🚧</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
