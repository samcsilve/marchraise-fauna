import Layout from "@/components/Layout";
import { AuthProvider } from "@/lib/auth";
import { ApolloProviderWrapper } from "@/utils/apolloClient";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "../styles/globals.css";
import "@fontsource/poppins/400.css";

const theme = extendTheme({
  fonts: {
    body: "Poppins",
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
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
