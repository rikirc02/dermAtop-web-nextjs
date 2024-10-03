import { responsiveFontSizes } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { dark, light } from "./palette";

const theme = (mode) =>
  responsiveFontSizes(
    createTheme({
      palette: mode === "light" ? light : dark,
      shape: {
        borderRadius: 8,
      },
    })
  );

export default theme;
