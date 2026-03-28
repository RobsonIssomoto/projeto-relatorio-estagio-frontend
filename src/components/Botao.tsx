import Button from "@mui/material/Button";

type BotaoProps = {
  texto: string;
};

export function Botao({ texto }: BotaoProps) {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#1976d2",
        borderRadius: "10px",
        paddin: "8px 16px",
        "&hover": {
          backgroundColor: "#115293",
        },
      }}>
      {texto}
    </Button>
  );
}
