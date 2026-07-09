<template>
  <v-form @submit.prevent="submit" class="pa-4 d-flex flex-column ga-3">
    <v-text-field
      :label="$t('forms.name')"
      v-model="name.value.value"
      :error-messages="name.errorMessage.value"
      prepend-inner-icon="mdi-text"
    />

    <v-text-field
      :label="$t('forms.address')"
      v-model="address.value.value"
      :error-messages="address.errorMessage.value"
      prepend-inner-icon="mdi-map-marker-outline"
    />

    <v-row dense>
      <v-col cols="12" md="6">
        <v-switch
          :label="$t('forms.isActive')"
          v-model="isActive.value.value"
          :error-messages="isActive.errorMessage.value"
          color="primary"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-switch
          :label="$t('forms.pickupEnabled')"
          v-model="isPickupEnabled.value.value"
          :error-messages="isPickupEnabled.errorMessage.value"
          color="primary"
        />
      </v-col>
    </v-row>

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
import type { BranchNode } from "@/graphql/entities/branch";
import * as z from "zod";
import { computed, watch } from "vue";
import { useField, useForm } from "vee-validate";

export interface BranchFormValues {
  id?: string;
  name: string;
  address: string;
  isActive: boolean;
  isPickupEnabled: boolean;
}

export interface BranchFormErrors {
  name?: string;
  address?: string;
  isActive?: string;
  isPickupEnabled?: string;
}

const emit = defineEmits<{
  submit: [BranchFormValues];
}>();

const props = withDefaults(
  defineProps<{
    loading: boolean;
    branch?: BranchNode | null;
  }>(),
  {
    loading: false,
    branch: null,
  },
);

const isEditing = computed(() => Boolean(props.branch?.id));

const getInitialValues = () => ({
  name: props.branch?.name ?? "",
  address: props.branch?.address ?? undefined,
  isActive: props.branch?.isActive ?? true,
  isPickupEnabled: props.branch?.isPickupEnabled ?? true,
});

const BranchFormSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  isActive: z.boolean(),
  isPickupEnabled: z.boolean(),
});

const { handleSubmit, resetForm, setErrors } = useForm({
  validationSchema: BranchFormSchema,
  initialValues: getInitialValues(),
});

const name = useField<string>("name");
const address = useField<string>("address");
const isActive = useField<boolean>("isActive");
const isPickupEnabled = useField<boolean>("isPickupEnabled");

watch(
  () => props.branch,
  () => {
    resetForm({ values: getInitialValues() });
  },
);

defineExpose({
  setErrors,
});

const submit = handleSubmit((values, actions) => {
  emit("submit", {
    id: props.branch?.id,
    name: values.name,
    address: values.address,
    isActive: values.isActive,
    isPickupEnabled: values.isPickupEnabled,
  });
});
</script>
