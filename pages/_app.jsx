import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../components/Layout/Layout';
import { AppProvider } from '../context/appContext';
import { SessionProvider } from 'next-auth/react';
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '../context/AuthContext';
function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <AuthProvider>
        <CartProvider>
            <SessionProvider>
              <ChakraProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </ChakraProvider>
            </SessionProvider>
        </CartProvider>
    </AuthProvider>
    </AppProvider>
  );
}

export default MyApp;
