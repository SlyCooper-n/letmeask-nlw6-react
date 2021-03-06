import { Template } from "@components/layout";
import { AuthProvider } from "@core/contexts";
import type { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Template>
        <Component {...pageProps} />
      </Template>
    </AuthProvider>
  );
}

export default MyApp;
