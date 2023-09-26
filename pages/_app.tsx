import Layout from "@/components/Layout/Layout";
import UserContextProvider from "@/store/user-context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
// import { Provider } from "react-redux";
// import store from "../store/index";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      {/* <Provider store={store}> */}
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
      {/* </Provider> */}
    </Layout>
  );
}
