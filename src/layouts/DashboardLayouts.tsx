import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, Drawer, Toolbar, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

// Ícones apenas dos links principais
import DescriptionIcon from "@mui/icons-material/Description";
import HomeIcon from "@mui/icons-material/Home";

// Importa o Header
import Header from "../components/Navbar/Header";

const LARGURA_ABERTA = 200;
const LARGURA_FECHADA = 65;

export function DashboardLayout() {
  const [menuAberto, setMenuAberto] = useState(true);

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f5f7fa" }}>
      {/* 1. HEADER*/}
      <Header onToggleMenu={() => setMenuAberto(!menuAberto)} />

      {/* 2. MENU LATERAL */}
      <Drawer
        variant="permanent"
        sx={{
          width: menuAberto ? LARGURA_ABERTA : LARGURA_FECHADA,
          flexShrink: 0,
          whiteSpace: "nowrap",
          transition: "width 0.3s",
          "& .MuiDrawer-paper": {
            width: menuAberto ? LARGURA_ABERTA : LARGURA_FECHADA,
            transition: "width 0.3s",
            overflowX: "hidden",
            borderRight: "none",
            boxShadow: "2px 0 5px rgba(0,0,0,0.05)",
          },
        }}>
        <Toolbar sx={{ minHeight: 64 }} />

        <Box sx={{ mt: 2 }}>
          <List>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton sx={{ minHeight: 48, justifyContent: menuAberto ? "initial" : "center", px: 2.5 }}>
                <ListItemIcon sx={{ minWidth: 0, mr: menuAberto ? 2 : "auto", justifyContent: "center" }}>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Início" sx={{ opacity: menuAberto ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton sx={{ minHeight: 48, justifyContent: menuAberto ? "initial" : "center", px: 2.5 }}>
                <ListItemIcon sx={{ minWidth: 0, mr: menuAberto ? 2 : "auto", justifyContent: "center" }}>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="Documentos" sx={{ opacity: menuAberto ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* 3. ÁREA DE CONTEÚDO PRINCIPAL */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: "100%" }}>
        <Toolbar sx={{ minHeight: 64 }} />
        <Outlet />
      </Box>
    </Box>
  );
}
