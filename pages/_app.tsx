import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/contexts";
import { Template } from "@components/layout";

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
