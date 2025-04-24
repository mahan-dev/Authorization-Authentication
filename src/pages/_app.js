import "@/styles/globals.css";
import theme from "@/theme/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <>
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      <Toaster />
    </ThemeProvider>
    </>
  );
}

export default MyApp;
