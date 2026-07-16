<template>
  <v-form
    @submit.prevent="submit"
    :class="[
      'd-flex  ga-3',
      variant === 'compact' ? 'flex-row' : 'flex-column',
    ]"
  >
    <v-text-field
      :label="$t('forms.name')"
      type="name"
      v-model="name.value.value"
      :error-messages="name.errorMessage.value"
      prepend-inner-icon="mdi-text"
      hide-details="auto"
    />

    <v-switch
      v-if="variant === 'normal'"
      :label="$t('forms.isActive')"
      v-model="isActive.value.value"
      :error-messages="isActive.errorMessage.value"
      color="primary"
    >
    </v-switch>

    <v-btn
      :class="variant === 'normal' ? 'mt-3' : ''"
      type="submit"
      :block="variant === 'normal'"
      :append-icon="variant === 'normal' ? 'mdi-content-save' : undefined"
      :loading
      :icon="variant === 'compact' ? 'mdi-content-save' : undefined"
      :density="variant === 'compact' ? 'comfortable' : undefined"
      :variant="variant === 'compact' ? 'text' : undefined"
      :text="
        variant === 'compact'
          ? undefined
          : isEditing
            ? $t('forms.update')
            : $t('forms.create')
      "
    >
    </v-btn>
    <DeleteCategoryModal
      v-if="category && variant === 'compact'"
      :category="category"
    />
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
  name?: string;
  isActive?: string;
  parentId?: string;
}

const emit = defineEmits<{
  submit: [CategoryFormValues];
}>();

const props = withDefaults(
  defineProps<{
    loading: boolean;
    variant?: "compact" | "normal";
    category?: CategoryNode | null;
  }>(),
  {
    loading: false,
    category: null,
    variant: "normal",
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
