import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { parseCookies } from "nookies";

// graphql.us.fauna.com

export const ApolloProviderWrapper = ({ children }) => {
  const authMiddleware = setContext(async (req, { headers }) => {
    const { faunaToken } = parseCookies();
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${
          faunaToken ? faunaToken : process.env.NEXT_PUBLIC_GUEST_KEY
        }`,
      },
    };
  });

  const httpLink = new HttpLink({
    uri: "https://graphql.us.fauna.com/graphql",
  });

  const apolloClient = new ApolloClient({
    link: from([authMiddleware, httpLink]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            campaigns: {
              merge: false,
            },
            users: {
              merge: false,
            },
            members: {
              merge: false,
            },
          },
        },
      },
    }),
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
