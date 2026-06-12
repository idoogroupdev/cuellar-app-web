// Styles
import "@mdi/font/css/materialdesignicons.css";
// @ts-ignore
import "vuetify/styles";

import { iconsax } from "@/components/iconsax";
import en from "@/locales/en";
import es from "@/locales/es";
import { es as esLocaleVuetify, en as enLocaleVuetify } from "vuetify/locale";
import { createI18n, useI18n } from "vue-i18n";
import { createVuetify } from "vuetify";
import { createVueI18nAdapter } from "vuetify/locale/adapters/vue-i18n";
import * as z from "zod";
import { es as esZod } from "zod/locales";
import { aliases, mdi } from "vuetify/iconsets/mdi";

z.config(esZod());

export const i18n = createI18n({
  legacy: false,
  locale: "es",
  fallbackLocale: "en",
  messages: {
    es: {
      $vuetify: esLocaleVuetify,
      ...es,
    },
    en: {
      $vuetify: enLocaleVuetify,
      ...en,
    },
  },
});

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: "light",
  },
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n }),
  },
  defaults: {
    VBtn: {
      color: "primary",
      elevation: 0,
      rounded: "lg",
      class: "text-none",
    },
    VTextField: {
      variant: "outlined",
      rounded: "lg",
      density: "compact",
    },
    VSheet: {
      rounded: "lg",
    },
    VAlert: {
      variant: "tonal",
    },
    VSelect: {
      variant: "outlined",
      density: "compact",
    },
  },
  icons: {
    defaultSet: "mdi",
    aliases: {
      ...aliases,
      ...iconsax,
    },
    sets: {
      mdi,
    },
  },
});
