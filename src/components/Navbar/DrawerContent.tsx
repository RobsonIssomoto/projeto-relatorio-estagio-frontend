import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

// Importa a mesma lista aqui!
import { NAV_ITEMS } from "../../utils/navigation";
import { Link as RouterLink } from "react-router-dom";

interface Props {
  onClose: () => void;
}

export default function DrawerContent({ onClose }: Props) {
  return (
    <Box onClick={onClose} sx={{ textAlign: "center" }}>
      {/* Logo */}
      <Box sx={{ my: 2 }}>
        <Box component="img" src="/fatec_atibaia_logo.png" alt="logo" sx={{ height: 40 }} />
      </Box>

      <Divider />

      {/* Menu principal utilizando a constante */}
      <List>
        {NAV_ITEMS.map((item) => (
          <ListItem key={item.label} disablePadding>
            {/* 2. Transforma o botão em link e fecha o menu ao clicar */}
            <ListItemButton component={RouterLink} to={item.path} onClick={onClose} sx={{ justifyContent: "center" }}>
              {/* 3. Aponta para a propriedade 'label' */}
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Ações */}
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/cadastro"
            onClick={onClose}
            sx={{ justifyContent: "center", color: "fatec.main" }}>
            <ListItemText primary="Cadastrar" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/login" onClick={onClose} sx={{ justifyContent: "center" }}>
            <ListItemText primary="Login" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
