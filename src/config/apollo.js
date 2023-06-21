import { DefaultApolloClient } from "@vue/apollo-composable";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  cache,
  uri: import.meta.env.VITE_BACKEND_URL
});

export { DefaultApolloClient, apolloClient };
