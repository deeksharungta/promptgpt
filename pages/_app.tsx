import Layout from "@/components/Layout/Layout";
import SetupContextProvider from "@/store/setup-context";
import UserContextProvider from "@/store/user-context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <SetupContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SetupContextProvider>
    </UserContextProvider>
  );
}
