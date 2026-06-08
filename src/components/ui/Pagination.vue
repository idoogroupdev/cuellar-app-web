<template>
  <div class="d-flex align-center justify-space-between w-100 pa-4">
    <div>{{ t("page") }} {{ page }}</div>
    <div class="d-flex align-center ga-2">
      <v-btn
        icon="mdi-chevron-left"
        density="comfortable"
        @click="emit('prev')"
        :disabled="!pageInfo?.hasPreviousPage"
        color=""
      />
      <v-btn
        density="comfortable"
        icon="mdi-chevron-right"
        @click="emit('next')"
        :disabled="!pageInfo?.hasNextPage"
        color=""
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useLocale } from "vuetify";
import { type PageInfo } from "@/graphql/composables/common";

const { t } = useLocale();

export interface Props {
  page?: number;
  pageInfo?: PageInfo;
}

withDefaults(defineProps<Props>(), {
  page: 1,
});

const emit = defineEmits<{
  (e: "prev" | "next"): void;
}>();
</script>
