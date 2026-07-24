<template>
  <v-form class="pa-4" @submit.prevent="submit">
    <v-alert v-if="error" :text="error" type="error" class="mb-6" />
    <VueDraggable v-model="names">
      <v-row v-for="(item, index) in names" :key="index" size="7">
        <v-col>
          <v-text-field
            :label="$t('categories.modals.subcategoryName')"
            v-model="names[index]"
            hide-details="auto"
            prepend-inner-icon="mdi-text"
          />
        </v-col>
        <v-col cols="2" class="d-flex justify-center align-center">
          <v-btn density="compact" icon="mdi-cursor-move" variant="text">
          </v-btn>
          <v-btn
            density="compact"
            icon="mdi-delete-outline"
            variant="text"
            @click="removeName(index)"
          >
          </v-btn>
        </v-col>
      </v-row>
    </VueDraggable>
    <div class="d-flex justify-start align-center ga-4 mt-4">
      <v-btn @click="addName" type="button" append-icon="mdi-calendar-edit">
        {{ $t("add") }}
      </v-btn>
      <v-btn type="submit" append-icon="mdi-content-save" :loading>
        {{ $t("save") }}
      </v-btn>
    </div>
  </v-form>
</template>
<script setup lang="ts">
import type { CategoryNode } from "@/graphql/category/entities";
import { VueDraggable } from "vue-draggable-plus";

const emit = defineEmits<{
  submit: [string[]];
}>();

export interface Props {
  subcategories: CategoryNode[];
  loading: boolean;
  error?: string;
}

const props = withDefaults(defineProps<Props>(), {});

const names = ref<string[]>([]);

const addName = () => {
  names.value.push("");
};

const removeName = (_index: number) => {
  names.value = names.value.filter((value, index) => index !== _index);
};

const submit = () => {
  emit("submit", names.value);
};

watch(
  () => props.subcategories,
  (subcategories) => {
    if (!subcategories?.length) {
      names.value = [];
      return;
    }
    names.value = subcategories.map((item) => item.name);
  },
  {
    immediate: true,
  },
);
</script>
