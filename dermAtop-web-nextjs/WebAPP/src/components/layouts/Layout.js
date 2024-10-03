import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { IconButton, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import ColorModeContext from "../../utils/ColorModeContext";
import LogosSection from "../LogosSection";

function t(value) {
  return value;
}

const addTransparency = (color, transparency) => {
  const rgbaColor = color
    .replace("rgb", "rgba")
    .replace(")", `, ${transparency})`);
  return rgbaColor;
};

export default function Layout({ children }) {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const logos = [
    {
      name: "logo 1",
      image: "/assets/logos/favicon.png",
    },
    
  ];

  return (
    <Box
      sx={{
       backgroundColor:"white",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          backgroundColor: addTransparency(
            theme.palette.background.default,
            0.5
          ),
        }}
      >
        <Container maxWidth="lg" sx={{ py: 1 }}>
          <Grid container alignItems="center">
            <Grid
              container
              item
              xs={4}
              justifyContent="flex-start"
              alignItems="center"
            >
              <Box>
                <img
                  draggable={false}
                  src="/favicon.png"
                  alt="logo"
                  style={{
                    userSelect: "none",
                    objectFit: "contain",
                    height: 45,
                    marginRight: 8,
                  }}
                />
              </Box>
              <Typography
                variant="body1"
                align="center"
                fontWeight={600}
                style={{ userSelect: "none" }}
              >
                {t("dermAtop")}
              </Typography>
            </Grid>
            <Grid container item xs={8} justifyContent="flex-end">
             
            </Grid>
          </Grid>
        </Container>
        <Divider />
      </Box>

      <main>{children}</main>

      <Grid
        container
        item
        style={{
          backgroundColor: addTransparency(
            theme.palette.background.default,
            0.4
          ),
        }}
        justifyContent="center"
        alignItems="center"
        alignContent="center"
      >
        <LogosSection logos={logos} />
      </Grid>

      <Grid
        container
        item
        sx={{
          py: 2,
          backgroundColor: addTransparency(
            theme.palette.background.default,
            0.5
          ),
        }}
        justifyContent="center"
      >
        <Box>
        
        </Box>

        <Typography variant="body2">
          {t("Copyright © dermAtop ")}
          {new Date().getFullYear()}.
        </Typography>
      </Grid>
    </Box>
  );
}
