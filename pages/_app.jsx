import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../components/Layout/Layout';
import { AppProvider } from '../context/appContext';
import { SessionProvider } from 'next-auth/react';
function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <SessionProvider>
        <ChakraProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </SessionProvider>
    </AppProvider>
  );
}

export default MyApp;
