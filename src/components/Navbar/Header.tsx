import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";

interface HeaderProps {
  onToggleMenu: () => void;
}

export const Header = ({ onToggleMenu }: HeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const [usuario] = useState(() => {
    const stored = localStorage.getItem("@FatecEstagio:usuario");
    if (stored) {
      const parsed = JSON.parse(stored);
      let cargo = "Estagiário";
      if (parsed.perfil === 3) cargo = "Empresa";
      if (parsed.perfil === 4) cargo = "Supervisor";
      return { nome: parsed.nome || parsed.razaoSocial || "Usuário", cargo };
    }
    return { nome: "Usuário", cargo: "" };
  });

  const handleSair = () => {
    localStorage.removeItem("@FatecEstagio:token");
    localStorage.removeItem("@FatecEstagio:usuario");
    navigate("/login");
  };

  const getIniciais = (nome: string) => {
    const pedacos = nome.trim().split(" ");
    if (pedacos.length === 1) return pedacos[0].charAt(0).toUpperCase();
    return (pedacos[0].charAt(0) + pedacos[pedacos.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <AppBar
      position="fixed"
      color="fatec"
      elevation={0}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
      <Toolbar sx={{ minHeight: 64 }}>
        <IconButton onClick={onToggleMenu} edge="start" color="inherit" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap fontWeight="bold">
          SGR
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="small" sx={{ ml: 2 }}>
          <Avatar sx={{ width: 40, height: 40, bgcolor: "rgba(255,255,255,0.2)", color: "white", fontWeight: "bold" }}>
            {getIniciais(usuario.nome)}
          </Avatar>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          PaperProps={{ elevation: 3, sx: { mt: 1.5, minWidth: 220, borderRadius: 2 } }}>
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {usuario.nome}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {usuario.cargo}
            </Typography>
          </Box>
          <Divider />
          <MenuItem onClick={() => setAnchorEl(null)}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            Meu Perfil
          </MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            Configurações
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleSair} sx={{ color: "error.main" }}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" color="error" />
            </ListItemIcon>
            Sair
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
