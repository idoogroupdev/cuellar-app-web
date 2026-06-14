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

const roles = computed(() => {
  return [
    {
      value: "OPERATOR",
      title: t("roles.OPERATOR"),
    },
    {
      value: "BRANCH_OPERATOR",
      title: t("roles.BRANCH_OPERATOR"),
    },
    {
      value: "ADMIN",
      title: t("roles.ADMIN"),
    },
    {
      value: "SALESPERSON",
      title: t("roles.SALESPERSON"),
    },
    {
      value: "DELIVERY_DRIVER",
      title: t("roles.DELIVERY_DRIVER"),
    },
    {
      value: "CLIENT",
      title: t("roles.CLIENT"),
    },
    {
      value: "",
      title: t("all"),
    },
  ];
});

export interface Props {
  errorMessages?: string;
}

const props = withDefaults(defineProps<Props>(), {});

const model = defineModel<string>("model", {
  default: undefined,
});
</script>
