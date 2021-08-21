import Layout from "@/components/Layout";
import { AuthProvider } from "@/lib/auth";
import { ApolloProviderWrapper } from "@/utils/apolloClient";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "../styles/globals.css";
import "@fontsource/poppins/400.css";
import * as Fathom from 'fathom-client';
import Router from "next/router";


const theme = extendTheme({
  fonts: {
    body: "Poppins",
  },
});

Router.events.on("routeChangeComplete", () => {
  Fathom.trackPageview();
});

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    Fathom.load("EGFRQGQW", {
      includedDomains: ["www.marchraiseapp.com", "marchraiseapp.com"],
    });
  }, []);

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
