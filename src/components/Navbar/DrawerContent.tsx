import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

// Importamos a mesma lista aqui!
import { NAV_ITEMS } from "../../utils/navigation";

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
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ justifyContent: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Ações */}
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ justifyContent: "center", color: "fatec.main" }}>
            <ListItemText primary="Cadastrar" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton sx={{ justifyContent: "center" }}>
            <ListItemText primary="Login" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
