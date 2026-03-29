import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { theme } from "./theme/theme";
import Navbar from "./components/Navbar/Navbar";
import Cadastro from "./pages/Auth/Cadastro/Cadastro";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />

      {/* Container Principal da Aplicação */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          // 72px da Navbar + 40px de margem de segurança = 112px
          pt: "112px",
          // 40px de margem no rodapé para quando a pessoa rolar a página até o final
          pb: "40px",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f7fa",
        }}>
        <Cadastro />
      </Box>
    </ThemeProvider>
  );
}
