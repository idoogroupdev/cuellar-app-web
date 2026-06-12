<template>
  <v-select
    :label="$t('forms.role')"
    v-model="model"
    :items="roles"
    item-title="title"
    item-value="value"
    :error-messages="errorMessages"
    prepend-inner-icon="mdi-account-key"
  />
</template>
<script setup lang="ts">
import { useLocale } from "vuetify";

const { t } = useLocale();

const roles = [
  {
    value: "OPERATOR",
    title: "OPERATOR",
  },
  {
    value: "BRANCH_OPERATOR",
    title: "BRANCH_OPERATOR",
  },
  {
    value: "ADMIN",
    title: "ADMIN",
  },
  {
    value: "SALESPERSON",
    title: "SALESPERSON",
  },
  {
    value: "DELIVERY_DRIVER",
    title: "DELIVERY_DRIVER",
  },
  {
    value: "CLIENT",
    title: "CLIENT",
  },
  {
    value: "",
    title: t("none"),
  },
];

export interface Props {
  errorMessages?: string;
}

const props = withDefaults(defineProps<Props>(), {});

const model = defineModel<string>("model", {
  default: undefined,
});
</script>
