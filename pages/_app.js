import Layout from "@/components/Layout";
import { AuthProvider } from "@/lib/auth";
import { ApolloProviderWrapper } from "@/utils/apolloClient";
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <ApolloProviderWrapper>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProviderWrapper>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
