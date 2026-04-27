import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import * as MuiIcons from "@mui/icons-material";

export interface MenuItemProps {
  texto: string;
  icone: string;
  rota: string;
}

interface SidebarProps {
  open: boolean;
  itens: MenuItemProps[];
}

const drawerWidth = 240;
const miniDrawerWidth = 65;

export const Sidebar = ({ open, itens }: SidebarProps) => {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : miniDrawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
          }),
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : miniDrawerWidth,
          overflowX: "hidden",
          backgroundColor: "#ffffff",
          borderRight: "1px solid rgba(0, 0, 0, 0.12)",
          transition: (theme) =>
            theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.standard,
            }),
        },
      }}>
      <Toolbar />

      <Box sx={{ overflow: "hidden" }}>
        <List>
          {itens.map((item) => {
            const nomeIcone = item.icone as keyof typeof MuiIcons;
            const IconeTag = MuiIcons[nomeIcone];
            const isSelected = location.pathname === item.rota;

            return (
              <ListItem key={item.texto} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  component={RouterLink}
                  to={item.rota}
                  selected={isSelected}
                  sx={{
                    minHeight: 48,
                    px: 2.5, // Mantém o padding fixo sempre
                  }}>
                  <ListItemIcon
                    sx={{
                      minWidth: 40, // O SEGREDO: Largura fixa pro ícone não pular
                      color: isSelected ? "fatec.main" : "inherit",
                    }}>
                    {IconeTag ? <IconeTag /> : <MuiIcons.Circle />}
                  </ListItemIcon>

                  <ListItemText
                    primary={item.texto}
                    slotProps={{
                      primary: {
                        sx: { fontWeight: isSelected ? "bold" : "normal" },
                      },
                    }}
                    sx={{
                      opacity: open ? 1 : 0,
                      transition: "opacity 0.3s ease-in-out",
                      whiteSpace: "nowrap", // Evita que o texto quebre de linha ao encolher
                      margin: 0,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};
