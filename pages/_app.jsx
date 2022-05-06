import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react"
import Layout from "../components/Layout/Layout"
function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
    <ChakraProvider>
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
