import "../styles/globals.css";
import type { AppProps } from "next/app";
import "regenerator-runtime/runtime";
import { AppProvider } from "../context/appContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}
