import { useState } from "react";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Navbar/Header";
import { Sidebar, type MenuItemProps } from "../../src/components/Navbar/Siderbar";

export const DashboardLayout = () => {
  const [menuAberto, setMenuAberto] = useState(true);

  // MÁGICA AQUI: O estado já "nasce" com os itens corretos lendo o localStorage,
  // sem precisar do useEffect. O React processa essa função apenas 1 vez.
  const [itensDoMenu] = useState<MenuItemProps[]>(() => {
    const stored = localStorage.getItem("@FatecEstagio:usuario");

    if (stored) {
      const user = JSON.parse(stored);

      // Menu do Supervisor (Perfil 4)
      if (user.perfil === 4) {
        return [
          { texto: "Início", icone: "Home", rota: "/dashboard/supervisor" },
          { texto: "Estagiários", icone: "People", rota: "/dashboard/supervisor/estagiarios" },
          { texto: "Relatórios", icone: "FactCheck", rota: "/dashboard/supervisor/relatorios" },
          { texto: "Histórico", icone: "History", rota: "/dashboard/supervisor/historico" },
        ];
      }

      // Se futuramente quiser colocar o da Empresa (Perfil 3), é só adicionar um 'else if' aqui
    }

    // Menu Padrão / Estagiário (Perfil 2)
    return [
      { texto: "Início", icone: "Dashboard", rota: "/dashboard/estagiario" },
      { texto: "Atividades", icone: "Assignment", rota: "/dashboard/atividades" },
      { texto: "Relatórios", icone: "Description", rota: "/dashboard/relatorios" },
    ];
  });

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header onToggleMenu={() => setMenuAberto(!menuAberto)} />
      <Sidebar open={menuAberto} itens={itensDoMenu} />

      <Box component="main" sx={{ backgroundColor: "#f5f7fa", flexGrow: 1, height: "100vh", overflow: "auto" }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};
