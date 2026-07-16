<template>
  <v-dialog max-width="580" v-model="isOpen">
    <template #activator="{ props: activatorProps }">
      <slot name="activator" :props="activatorProps">
        <v-btn
          v-bind="activatorProps"
          :text="
            isEditing
              ? $t('categories.modals.editTitle')
              : $t('categories.modals.createTitle')
          "
          :append-icon="isEditing ? 'mdi-pencil' : 'mdi-plus'"
        ></v-btn>
      </slot>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card
        :title="
          isEditing
            ? $t('categories.modals.editTitle')
            : $t('categories.modals.createTitle')
        "
        :subtitle="$t('categories.modals.description')"
      >
        <v-card-text>
          <CategoryForm
            :loading
            :category="category"
            @submit="onSubmit"
            ref="formRef"
          />
        </v-card-text>
        <template #append>
          <v-btn
            density="comfortable"
            icon="mdi-close"
            variant="text"
            @click="isActive.value = false"
          ></v-btn>
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
<script lang="ts" setup>
import CategoryForm, {
  type CategoryFormValues,
  type CategoryFormErrors,
} from "@/components/categories/forms/CategoryForm.vue";
import { type CategoryNode } from "@/graphql/category/entities";
import {
  useCreateCategory,
  useUpdateCategory,
} from "@/graphql/category/composables";
import { normalizeApolloError } from "@/lib/helpers";
import { useMessagesStore } from "@/stores/messages";
import { useLocale } from "vuetify";

const emit = defineEmits<{
  "update:modelValue": [boolean];
  saved: [CategoryNode];
}>();

const props = withDefaults(
  defineProps<{
    category?: CategoryNode | null;
  }>(),
  {
    category: null,
  },
);

const isOpen = ref(false);

const { t } = useLocale();
const messages = useMessagesStore();
const isEditing = computed(() => Boolean(props.category?.id));
const close = () => (isOpen.value = false);

const {
  mutate: createCategory,
  loading: creating,
  onError: onCreateError,
} = useCreateCategory();

const {
  mutate: updateCategory,
  loading: updating,
  onError: onUpdateError,
} = useUpdateCategory();

const formRef = ref<InstanceType<typeof CategoryForm> | null>(null);
const loading = computed(() => creating.value || updating.value);

const onSubmit = async (values: CategoryFormValues) => {
  const result = isEditing.value
    ? await updateCategory({
        input: {
          id: values.id ?? "",
          name: values.name,
          isActive: values.isActive,
          parentId: values.parentId,
          sortOrder: undefined,
        },
      })
    : await createCategory({
        input: {
          name: values.name,
          isActive: values.isActive,
          parentId: values.parentId,
          sortOrder: undefined,
        },
      });

  const savedCategory =
    // @ts-ignore
    result?.data?.updateCategory?.category ??
    // @ts-ignore
    result?.data?.createCategory?.category;

  if (savedCategory) {
    messages.add({
      text: t(
        isEditing.value
          ? "categories.forms.updated"
          : "categories.forms.created",
      ),
      color: "success",
      variant: "flat",
    });
    emit("saved", savedCategory);
    // close the modal after the branch is created
    if (!isEditing.value) {
      close();
    }
  }
};

onCreateError((error) => {
  const errors = normalizeApolloError(
    error?.graphQLErrors,
  ) as unknown as CategoryFormErrors;

  formRef.value?.setErrors({
    ...errors,
  });
});

onUpdateError((error) => {
  const errors = normalizeApolloError(
    error?.graphQLErrors,
  ) as unknown as CategoryFormErrors;

  formRef.value?.setErrors({
    ...errors,
  });
});
</script>
