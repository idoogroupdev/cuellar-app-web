<template>
  <v-dialog max-width="500" v-model="dialog">
    <template v-slot:activator="{ props }">
      <v-btn
        density="compact"
        icon="mdi-delete-outline"
        variant="text"
        v-bind="props"
      ></v-btn>
    </template>

    <template #default>
      <v-card :title="$t('categories.modals.deleteTitle')">
        <v-card-text>
          <p>
            {{
              $t("categories.modals.deleteDescription", {
                name: category?.name,
              })
            }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :text="$t('forms.cancel')" @click="dialog = false"></v-btn>
          <v-btn
            color="error"
            :text="$t('forms.delete')"
            @click="emit('delete', category)"
            append-icon="mdi-delete-outline"
            variant="tonal"
            :loading
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script setup lang="ts">
import type { CategoryNode } from "@/graphql/category/entities";

const emit = defineEmits<{
  delete: [CategoryNode];
}>();

const props = withDefaults(
  defineProps<{
    loading: boolean;
    category: CategoryNode;
    errors?: string | string[];
  }>(),
  {
    loading: false,
  },
);

const dialog = defineModel<boolean>({ default: false });
</script>
