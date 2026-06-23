import { useAuthCookie } from "@/composables/useAuthCookie";
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";
import { DefaultApolloClient } from "@vue/apollo-composable";
import type { App } from "vue";

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_API_URL,
});

const authLink = setContext((_, { headers, skipAuth }) => {
  if (skipAuth) {
    return { headers };
  }

  const { token } = useAuthCookie();
  const authHeaders = token ? { Authorization: `JWT ${token}` } : {};

  return {
    headers: {
      ...headers,
      ...authHeaders,
    },
  };
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache,
});

export const apolloProvider = {
  install(app: App) {
    app.provide(DefaultApolloClient, apolloClient);
  },
};
