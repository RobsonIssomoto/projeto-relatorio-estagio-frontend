import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CssBaseline from "@mui/material/CssBaseline";
import DescriptionIcon from "@mui/icons-material/Description";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";

const drawerWidth = 200;

export function DashboardLayout() {
  const [menuAberto, setMenuAberto] = useState(true);
  const navigate = useNavigate();

  const handleSair = () => {
    localStorage.removeItem("@FatecEstagio:token");
    localStorage.removeItem("@FatecEstagio:usuario");
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f5f7fa" }}>
      <CssBaseline />
      {/* 1. BARRA SUPERIOR (AppBar) - Padrão Navbar Fatec */}
      <AppBar
        position="fixed"
        color="fatec" // Usando a propriedade de cor diretamente!
        elevation={0} // Sem sombra, padrão mais moderno
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          borderBottom: "1px solid rgba(0,0,0,0.05)",
        }}>
        <Toolbar sx={{ minHeight: 72, height: 72 }}>
          {/* Adicionado color="inherit" para o ícone ficar branco/claro acompanhando o tema */}
          <IconButton onClick={() => setMenuAberto(!menuAberto)} edge="start" color="inherit" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>

          {/* Adicionado color="inherit" para o texto contrastar com o fundo Fatec */}
          <Typography variant="h6" noWrap component="div" fontWeight="bold" color="inherit"></Typography>
        </Toolbar>
      </AppBar>

      {/* 2. MENU LATERAL (Drawer) */}
      <Drawer
        variant="persistent"
        open={menuAberto}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "none",
            boxShadow: "2px 0 5px rgba(0,0,0,0.05)",
          },
        }}>
        <Toolbar sx={{ minHeight: 72, height: 72 }} /> {/* Ajustado para a mesma altura da AppBar */}
        <Box sx={{ overflow: "auto", mt: 2 }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Início" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="Documentos" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Perfil" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider sx={{ my: 2 }} />
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={handleSair} sx={{ color: "error.main" }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <LogoutIcon color="error" />
                </ListItemIcon>
                <ListItemText primary="Sair" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* 3. ÁREA DE CONTEÚDO PRINCIPAL (A "Janela") */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: "margin 0.3s",
          marginLeft: menuAberto ? 0 : `-${drawerWidth}px`,
        }}>
        <Toolbar sx={{ minHeight: 72 }} />
        {/* O Outlet é onde as telas filhas (DashboardEstagiario, etc) vão aparecer! */}
        <Outlet />
      </Box>
    </Box>
  );
}
