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

// Ícones
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";

// A MÁGICA: O Header agora recebe funções do Layout "Pai"
interface HeaderProps {
  onToggleMenu: () => void;
}

export default function Header({ onToggleMenu }: HeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleSair = () => {
    localStorage.removeItem("@FatecEstagio:token");
    localStorage.removeItem("@FatecEstagio:usuario");
    navigate("/login");
  };

  const usuario = { nome: "Robson Issomoto", cargo: "Estagiário", fotoUrl: "" };

  const getIniciais = (nome: string) => {
    const pedaços = nome.split(" ");
    if (pedaços.length === 1) return pedaços[0].charAt(0).toUpperCase();
    return (pedaços[0].charAt(0) + pedaços[pedaços.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <AppBar
      position="fixed"
      color="fatec"
      elevation={0}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
      <Toolbar sx={{ minHeight: 64 }}>
        {/* BOTÃO DO MENU LATERAL */}
        <IconButton onClick={onToggleMenu} edge="start" color="inherit" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" noWrap component="div" fontWeight="bold" color="inherit">
          SGR
        </Typography>

        {/* Joga os próximos itens pro canto direito */}
        <Box sx={{ flexGrow: 1 }} />

        {/* MENU DO USUÁRIO (AVATAR) */}
        <IconButton onClick={handleOpenMenu} size="small" sx={{ ml: 2 }}>
          <Avatar
            src={usuario.fotoUrl}
            sx={{ width: 40, height: 40, bgcolor: "rgba(255,255,255,0.2)", color: "white", fontWeight: "bold" }}>
            {!usuario.fotoUrl && getIniciais(usuario.nome)}
          </Avatar>
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          PaperProps={{ elevation: 3, sx: { mt: 1.5, minWidth: 220, borderRadius: 2 } }}>
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="subtitle1" fontWeight="bold" noWrap>
              {usuario.nome}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {usuario.cargo}
            </Typography>
          </Box>
          <Divider sx={{ mb: 1 }} />
          <MenuItem onClick={handleCloseMenu}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            Meu Perfil
          </MenuItem>
          <MenuItem onClick={handleCloseMenu}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            Configurações
          </MenuItem>
          <Divider sx={{ my: 1 }} />
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
}
