import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client/core";
import { DefaultApolloClient } from "@vue/apollo-composable";
import type { App } from "vue";

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_API_URL,
});

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([httpLink]),
  cache,
});

export const apolloProvider = {
  install(app: App) {
    app.provide(DefaultApolloClient, apolloClient);
  },
};
