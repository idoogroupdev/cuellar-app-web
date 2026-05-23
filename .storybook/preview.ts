import type { Preview } from "@storybook/vue3-vite";
import { setup } from "@storybook/vue3-vite";
import vuetify, { i18n } from "../src/plugins/vuetify";

// Styles
// @ts-ignore
import "@mdi/font/css/materialdesignicons.css";
// @ts-ignore
import "vuetify/styles";

setup((app) => {
  app.use(i18n);
  app.use(vuetify);
});

const preview: Preview = {
  // decorators: [
  //   // [Vuetify] Could not find injected layout
  //   (story) => ({
  //     components: { Story: story() },
  //     template: `
  //     <v-layout style="margin: 3em;">
  //       <Story />
  //     </v-layout>
  //   `,
  //   }),
  // ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
