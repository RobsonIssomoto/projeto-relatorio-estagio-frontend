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
import DescriptionIcon from "@mui/icons-material/Description";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";

// 1. Criamos as duas larguras do menu
const LARGURA_ABERTA = 200;
const LARGURA_FECHADA = 65; // Tamanho ideal para mostrar apenas o ícone centralizado

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
      {/* BARRA SUPERIOR */}
      <AppBar
        position="fixed"
        color="fatec"
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          borderBottom: "1px solid rgba(0,0,0,0.05)",
        }}>
        <Toolbar sx={{ minHeight: 64 }}>
          <IconButton onClick={() => setMenuAberto(!menuAberto)} edge="start" color="inherit" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" fontWeight="bold" color="inherit">
            SGR
          </Typography>
        </Toolbar>
      </AppBar>

      {/* MENU LATERAL (O "Mini Variant") */}
      <Drawer
        variant="permanent" // 2. Trocamos de "persistent" para "permanent"
        sx={{
          width: menuAberto ? LARGURA_ABERTA : LARGURA_FECHADA,
          flexShrink: 0,
          whiteSpace: "nowrap",
          transition: "width 0.3s", // Animação suave
          "& .MuiDrawer-paper": {
            width: menuAberto ? LARGURA_ABERTA : LARGURA_FECHADA,
            transition: "width 0.3s",
            overflowX: "hidden", // 3. Isso impede o texto de "vazar" quando o menu encolhe
            borderRight: "none",
            boxShadow: "2px 0 5px rgba(0,0,0,0.05)",
          },
        }}>
        <Toolbar sx={{ minHeight: 64 }} />

        <Box sx={{ mt: 2 }}>
          <List>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: menuAberto ? "initial" : "center", // Centraliza o ícone se fechado
                  px: 2.5,
                }}>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: menuAberto ? 2 : "auto", // Espaçamento dinâmico
                    justifyContent: "center",
                  }}>
                  <HomeIcon />
                </ListItemIcon>
                {/* 4. A opacidade some suavemente com o texto */}
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

          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: menuAberto ? "initial" : "center",
                px: 2.5,
              }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: menuAberto ? 2 : "auto",
                  justifyContent: "center",
                }}>
                <SettingsIcon />
              </ListItemIcon>

              <ListItemText primary="Perfil" sx={{ opacity: menuAberto ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <Divider sx={{ my: 2 }} />

          <List>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={handleSair}
                sx={{ minHeight: 48, justifyContent: menuAberto ? "initial" : "center", px: 2.5, color: "error.main" }}>
                <ListItemIcon sx={{ minWidth: 0, mr: menuAberto ? 2 : "auto", justifyContent: "center" }}>
                  <LogoutIcon color="error" />
                </ListItemIcon>
                <ListItemText primary="Sair" sx={{ opacity: menuAberto ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* ÁREA DE CONTEÚDO PRINCIPAL */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: "100%" }}>
        <Toolbar sx={{ minHeight: 64 }} />
        <Outlet />
      </Box>
    </Box>
  );
}
