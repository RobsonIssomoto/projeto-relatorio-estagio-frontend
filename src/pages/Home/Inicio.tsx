import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";

// Importações dos novos sub-componentes traduzidos
import Apresentacao from "./components/Apresentacao";
import Funcionalidades from "./components/Funcionalidades";
import Sobre from "./components/Sobre";
import PerguntasFrequentes from "./components/PerguntasFrequentes";
import Contato from "./components/Contato";
import Rodape from "./components/Rodape";

export default function Inicio() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#inicio") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <Box sx={{ bgcolor: "#f7f7f8", color: "#1f1f1f" }}>
      <Apresentacao />
      <Funcionalidades />
      <Sobre />
      <PerguntasFrequentes />
      <Contato />
      <Rodape />
    </Box>
  );
}
