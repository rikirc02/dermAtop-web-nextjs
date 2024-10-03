import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect, useMemo, useState } from "react";
import theme from "../theme";
import ColorModeContext from "../utils/ColorModeContext";

import '../utils/i18n';

export const cache = createCache({ key: "css", prepend: true });

export default function MyApp({ Component, pageProps }) {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        window.localStorage.setItem(
          "themeMode",
          mode === "dark" ? "light" : "dark"
        );

        setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
      },
    }),
    [mode]
  );

  useEffect(() => {
    try {
      const localTheme = window.localStorage.getItem("themeMode");
      localTheme ? setMode(localTheme) : setMode("dark");
    } catch {
      setMode("dark");
    }
  }, []);

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");

    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme(mode)}>
          <CssBaseline />
          
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </ColorModeContext.Provider>
  );
}
