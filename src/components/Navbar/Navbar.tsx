import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import DrawerContent from "./DrawerContent";

import { Link as RouterLink } from "react-router-dom";

// 1. Importação da lista de itens de navegação
import { NAV_ITEMS } from "../../utils/navigation";

const drawerWidth = 200;

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/*  Utilizando cor 'fatec' criada no tema */}
      <AppBar component="nav" color="fatec">
        <Toolbar
          disableGutters
          sx={{
            minHeight: 72,
            height: 72,
            px: 2,
            "@media (min-width:600px)": {
              minHeight: 72,
              height: 72,
            },
          }}>
          {/* ESQUERDA (hamburguer + logo + menu) */}
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            {/* Menu hamburguer */}
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                ml: 0,
                p: "8px",
                width: 40,
                height: 40,
                display: { md: "none" },
              }}>
              <MenuIcon />
            </IconButton>

            {/* Logo */}
            <Box
              component="a"
              href="https://fatecatibaia.cps.sp.gov.br/"
              sx={{
                "&:hover": { opacity: 0.8 },
              }}>
              <Box
                component="img"
                src="/fatec_atibaia_br.png"
                alt="logo Fatec Atibaia"
                sx={{
                  display: { xs: "none", md: "flex" },
                  height: 50,
                  mr: 6,
                  mt: 2,
                }}
              />
            </Box>

            {/* Menu desktop iterando sobre a constante */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 2,
                ml: 2,
              }}>
              {NAV_ITEMS.map((item) => (
                <Button
                  key={item}
                  sx={{
                    color: "fatec.contrastText", // Usa o texto branco do tema
                    px: 3,
                    borderRadius: 2,
                    textTransform: "none", // Deixa o texto natural em vez de TUDO EM MAIÚSCULAS
                    fontSize: "1rem",
                    "&:hover": {
                      backgroundColor: "fatec.dark", // Usa o vermelho escuro no hover
                    },
                  }}>
                  {item}
                </Button>
              ))}
            </Box>
          </Box>

          {/* DIREITA (ações) */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1.5,
            }}>
            <Button
              component={RouterLink}
              to="/cadastro"
              variant="contained"
              sx={{
                backgroundColor: "#fff",
                color: "fatec.main",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                  color: "fatec.dark",
                },
              }}>
              Cadastrar
            </Button>

            <Button
              component={RouterLink}
              to="/login"
              variant="outlined"
              sx={{
                borderColor: "white",
                color: "white",
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: "fatec.dark",
                },
              }}>
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}>
        <DrawerContent onClose={handleDrawerToggle} />
      </Drawer>
    </Box>
  );
};
