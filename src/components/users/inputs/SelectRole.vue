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

export interface Props {
  errorMessages?: string;
  skipOptions?: string[];
}

const props = withDefaults(defineProps<Props>(), {});

const model = defineModel<string | undefined>("model", {
  default: undefined,
});

const roles = computed(() => {
  const options = [
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

  return options.filter((role) => !props?.skipOptions?.includes(role.value));
});
</script>
