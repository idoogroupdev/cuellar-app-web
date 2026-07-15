<template>
  <v-form @submit.prevent="submit" class="pa-4 d-flex flex-column ga-3">
    <v-text-field
      :label="$t('forms.name')"
      type="name"
      v-model="name.value.value"
      :error-messages="name.errorMessage.value"
      prepend-inner-icon="mdi-text"
    />

    <v-switch
      :label="$t('forms.isActive')"
      v-model="isActive.value.value"
      :error-messages="isActive.errorMessage.value"
      color="primary"
    >
    </v-switch>

    <v-btn
      class="mt-3"
      type="submit"
      block
      append-icon="mdi-content-save"
      :loading
    >
      {{ isEditing ? $t("forms.update") : $t("forms.create") }}
    </v-btn>
  </v-form>
</template>
<script setup lang="ts">
import type { CategoryNode } from "@/graphql/category/entities";
import * as z from "zod";
import { computed, watch } from "vue";
import { useField, useForm } from "vee-validate";
import { useLocale } from "vuetify";

export interface CategoryFormValues {
  id?: string;
  name: string;
  isActive: boolean;
  parentId?: string;
}

export interface CategoryFormErrors {
  id?: string;
  name?: string;
  isActive?: boolean;
  parentId?: string;
}

const emit = defineEmits<{
  submit: [CategoryFormValues];
}>();

const props = withDefaults(
  defineProps<{
    loading: boolean;
    category?: CategoryNode | null;
  }>(),
  {
    loading: false,
    category: null,
  },
);

const { t } = useLocale();
const isEditing = computed(() => Boolean(props.category?.id));

const getInitialValues = () => ({
  name: props.category?.name ?? "",
  isActive: props.category?.isActive ?? true,
  parentId: props.category?.parentId ?? undefined,
});

const CategoryFormSchema = z.object({
  name: z.string().min(1),
  isActive: z.boolean(),
  parentId: z.string().optional(),
});

const { handleSubmit, resetForm, setErrors } = useForm({
  validationSchema: CategoryFormSchema,
  initialValues: getInitialValues(),
});

defineExpose({
  setErrors,
});

watch(
  () => props.category,
  () => {
    resetForm({ values: getInitialValues() });
  },
);

const name = useField<string>("name");
const isActive = useField<boolean>("isActive");

const submit = handleSubmit((values, actions) => {
  emit("submit", {
    id: props.category?.id,
    name: values.name,
    isActive: values.isActive,
    parentId: undefined,
  });
});
</script>
