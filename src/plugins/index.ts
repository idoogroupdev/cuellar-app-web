// Plugins
import vuetify, { i18n } from "./vuetify";
import pinia from "../stores";
import router from "../router";
import { apolloProvider } from "./apollo";

// Types
import type { App } from "vue";

export function registerPlugins(app: App) {
  app.use(i18n).use(vuetify).use(router).use(pinia).use(apolloProvider);
}
