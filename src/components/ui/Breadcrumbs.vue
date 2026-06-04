<template>
  <v-breadcrumbs class="truncate" density="compact" :items="items" />
</template>
<script lang="ts" setup>
import { useRoute } from "vue-router";
import { useLocale } from "vuetify";

const route = useRoute();
const { t } = useLocale();

function replaceRouteParams(
  name: string,
  params: Record<string, string | string[] | undefined>,
) {
  for (const key of Object.keys(params)) {
    const value = params[key];
    if (typeof value === "string") {
      name = name.replace("[" + key + "]", value);
    }
  }
  return name;
}

const items = computed(() => {
  const routeName = replaceRouteParams(
    String(route.name ?? ""),
    route.params as Record<string, string | string[] | undefined>,
  );
  const items = routeName.replace(".", "/").split("/").slice(2);

  return items.filter(Boolean).map((part, index, arr) => {
    const to = "/" + arr.slice(0, index + 1).join("/");
    return { title: t(`breadcrumbs.${part}`), to };
  });
});
</script>
