<template>
  <v-dialog max-width="580" v-model="isOpen">
    <template #activator="{ props: activatorProps }">
      <slot name="activator" :props="activatorProps">
        <v-btn
          v-bind="activatorProps"
          :text="
            isEditing
              ? $t('branches.modals.editTitle')
              : $t('branches.modals.createTitle')
          "
          :append-icon="isEditing ? 'mdi-pencil' : 'mdi-plus'"
        ></v-btn>
      </slot>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card
        :title="
          isEditing
            ? $t('branches.modals.editTitle')
            : $t('branches.modals.createTitle')
        "
        :subtitle="$t('branches.modals.description')"
      >
        <v-card-text>
          <BranchForm ref="formRef" @submit="onSubmit" :branch :loading />
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
<script setup lang="ts">
import BranchForm, {
  type BranchFormValues,
  type BranchFormErrors,
} from "@/components/branches/forms/BranchForm.vue";
import type { BranchNode } from "@/graphql/entities/branch";
import { useCreateBranch, useUpdateBranch } from "@/graphql/composables/branch";
import { normalizeApolloError } from "@/lib/helpers";
import { useMessagesStore } from "@/stores/messages";
import { useLocale } from "vuetify";

const emit = defineEmits<{
  "update:modelValue": [boolean];
  saved: [BranchNode];
}>();

const props = withDefaults(
  defineProps<{
    branch?: BranchNode | null;
  }>(),
  {
    branch: null,
  },
);

const isOpen = ref(false);

const { t } = useLocale();
const messages = useMessagesStore();
const isEditing = computed(() => Boolean(props.branch?.id));

const {
  mutate: createBranch,
  loading: creating,
  onError: onCreateError,
} = useCreateBranch();

const {
  mutate: updateBranch,
  loading: updating,
  onError: onUpdateError,
} = useUpdateBranch();

const formRef = ref<InstanceType<typeof BranchForm> | null>(null);
const loading = computed(() => creating.value || updating.value);
const close = () => (isOpen.value = false);

const onSubmit = async (values: BranchFormValues) => {
  const result = isEditing.value
    ? await updateBranch({
        input: {
          id: values.id ?? "",
          name: values.name,
          address: values.address,
          isActive: values.isActive,
          isPickupEnabled: values.isPickupEnabled,
        },
      })
    : await createBranch({
        input: {
          name: values.name,
          address: values.address,
          isActive: values.isActive,
          isPickupEnabled: values.isPickupEnabled,
        },
      });

  const savedBranch =
    // @ts-ignore
    result?.data?.updateBranch?.branch ?? result?.data?.createBranch?.branch;

  if (savedBranch) {
    close();
    messages.add({
      text: t(
        isEditing.value ? "branches.forms.updated" : "branches.forms.created",
      ),
      color: "success",
      variant: "flat",
    });
    emit("saved", savedBranch);
  }
};

onCreateError((error) => {
  const errors = normalizeApolloError(
    error?.graphQLErrors,
  ) as unknown as BranchFormErrors;

  formRef.value?.setErrors({
    ...errors,
  });
});

onUpdateError((error) => {
  const errors = normalizeApolloError(
    error?.graphQLErrors,
  ) as unknown as BranchFormErrors;

  formRef.value?.setErrors({
    ...errors,
  });
});
</script>
