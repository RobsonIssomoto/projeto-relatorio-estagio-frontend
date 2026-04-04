import { forwardRef, useState } from "react";
import { TextField, InputAdornment, IconButton, type TextFieldProps } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export const CampoSenha = forwardRef<HTMLInputElement, TextFieldProps>(({ label, error, helperText, ...rest }, ref) => {
  const [mostrar, setMostrar] = useState(false);

  return (
    <TextField
      {...rest}
      inputRef={ref}
      label={label}
      type={mostrar ? "text" : "password"}
      required
      fullWidth
      size="small"
      error={error}
      helperText={helperText}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setMostrar(!mostrar)} edge="end">
                {mostrar ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
});
