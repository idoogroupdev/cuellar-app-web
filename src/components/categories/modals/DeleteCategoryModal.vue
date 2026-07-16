<template>
  <v-dialog max-width="500" v-model="dialog">
    <template v-slot:activator>
      <v-btn
        density="compact"
        icon="mdi-delete-outline"
        variant="text"
        @click="dialog = true"
      ></v-btn>
    </template>

    <template #default>
      <v-card :title="$t('categories.modals.deleteTitle')">
        <v-card-text>
          <v-alert
            class="mb-4"
            v-if="error"
            :text="error.message"
            type="error"
          />
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
            @click="onDelete"
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
import { useDeleteCategory } from "@/graphql/category/composables";
import { useMessagesStore } from "@/stores/messages";
import { useLocale } from "vuetify";

const emit = defineEmits<{
  success: [];
}>();

const props = withDefaults(
  defineProps<{
    category: CategoryNode;
  }>(),
  {},
);

const { t } = useLocale();
const messages = useMessagesStore();
const dialog = defineModel<boolean>({ default: false });
const close = () => (dialog.value = false);

const { loading, mutate: deleteCategory, error } = useDeleteCategory();

async function onDelete() {
  const result = await deleteCategory({
    input: {
      id: props.category.id,
    },
  });

  if (result?.data?.deleteCategory?.success) {
    messages.add({
      text: t("categories.modals.deleted"),
      color: "success",
      variant: "flat",
    });

    emit("success");
    close();
  }
}
</script>
