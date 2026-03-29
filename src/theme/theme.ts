import { createTheme } from "@mui/material/styles";
// Separamos as importações de tipo na linha de baixo!
import type { PaletteColor, PaletteColorOptions } from "@mui/material/styles";

// 1. Avisamos o TypeScript que existe uma nova cor na Paleta
declare module "@mui/material/styles" {
  interface Palette {
    fatec: PaletteColor;
  }
  interface PaletteOptions {
    fatec?: PaletteColorOptions;
  }
}

// 2. Avisamos os componentes que eles podem usar a cor 'fatec'
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    fatec: true;
  }
}

declare module "@mui/material/AppBar" {
  interface AppBarPropsColorOverrides {
    fatec: true;
  }
}

// 3. Criamos o tema de fato
export const theme = createTheme({
  palette: {
    fatec: {
      main: "#b20000",
      dark: "#7e0000",
      contrastText: "#ffffff",
    },
  },
});
