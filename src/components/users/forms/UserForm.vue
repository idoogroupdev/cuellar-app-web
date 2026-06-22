<template>
  <v-sheet max-width="580" class="mx-auto d-flex flex-column ga-5">
    <v-form @submit.prevent="submit" class="pa-4 d-flex flex-column ga-3">
      <v-text-field
        :label="$t('forms.email')"
        type="email"
        v-model="email.value.value"
        :disabled="isEditing"
        :error-messages="email.errorMessage.value"
        prepend-inner-icon="$email"
      />

      <v-text-field
        v-if="!isEditing"
        :label="$t('forms.password')"
        type="password"
        v-model="password.value.value"
        :error-messages="password.errorMessage.value"
        prepend-inner-icon="$lock"
      />

      <select-role
        v-model="roleName.value.value"
        :error-messages="roleName.errorMessage.value"
        :skip-options="['CLIENT', '']"
      />

      <select-branch
        v-if="roleName.value.value === 'BRANCH_OPERATOR'"
        v-model="branchId.value.value"
        :error-messages="branchId.errorMessage.value"
      />

      <v-row dense>
        <v-col cols="12" md="6">
          <v-text-field
            :label="$t('forms.firstName')"
            v-model="firstName.value.value"
            :error-messages="firstName.errorMessage.value"
            prepend-inner-icon="mdi-account"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            :label="$t('forms.lastName')"
            v-model="lastName.value.value"
            :error-messages="lastName.errorMessage.value"
            prepend-inner-icon="mdi-account"
          />
        </v-col>
      </v-row>

      <v-switch
        :label="$t('forms.isActive')"
        v-model="isActive.value.value"
        :error-messages="isActive.errorMessage.value"
        color="primary"
        :disabled="user?.isSuperuser"
      >
        <template #prepend>
          <v-tooltip interactive>
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn
                icon="mdi-information-outline"
                v-bind="activatorProps"
                density="compact"
                rounded="full"
                variant="text"
              ></v-btn>
            </template>
            <div>{{ $t("tooltip.deactivateUserAccessSystem") }}</div>
          </v-tooltip>
        </template>
      </v-switch>

      <v-btn
        class="mt-3"
        type="submit"
        block
        append-icon="mdi-content-save"
        :loading
      >
        {{
          isEditing
            ? $t("users.forms.user.update")
            : $t("users.forms.user.create")
        }}
      </v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup lang="ts">
import type { UserNode } from "@/graphql/entities/user";
import * as z from "zod";
import { computed, watch } from "vue";
import { useField, useForm } from "vee-validate";
import { useLocale } from "vuetify";

export interface UserFormValues {
  id?: string;
  email: string;
  password?: string;
  roleName: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  branchId?: string;
}

export interface UserFormErrors {
  email?: string;
  password?: string;
  roleName?: string;
  firstName?: string;
  lastName?: string;
  isActive?: string;
  branchId?: string;
}

const emit = defineEmits<{
  submit: [UserFormValues];
}>();

const props = withDefaults(
  defineProps<{
    loading: boolean;
    user?: UserNode | null;
  }>(),
  {
    loading: false,
    user: null,
  },
);

const { t } = useLocale();
const isEditing = computed(() => Boolean(props.user?.id));

const getInitialValues = () => ({
  email: props.user?.email ?? "",
  password: "",
  roleName: props.user?.role?.name ?? undefined,
  firstName: props.user?.firstName ?? "",
  lastName: props.user?.lastName ?? "",
  isActive: props.user?.isActive ?? true,
  branchId: props.user?.branch?.id ?? undefined,
});

const UserFormSchema = z
  .object({
    email: z.email(),
    password: z.string(),
    roleName: z.string().min(1),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    isActive: z.boolean(),
    branchId: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!isEditing.value && data.password.length < 8) {
      ctx.addIssue({
        code: "custom",
        path: ["password"],
        message: t("errors.passwordRequired"),
      });
    }

    if (data.password && data.password.length < 8) {
      ctx.addIssue({
        code: "custom",
        path: ["password"],
        message: t("errors.passwordMin"),
      });
    }
  });

const { handleSubmit, resetForm, setErrors } = useForm({
  validationSchema: UserFormSchema,
  initialValues: getInitialValues(),
});

const email = useField<string>("email");
const password = useField<string>("password");
const roleName = useField<string>("roleName");
const firstName = useField<string>("firstName");
const lastName = useField<string>("lastName");
const isActive = useField<boolean>("isActive");
const branchId = useField<boolean>("branchId");

watch(
  () => props.user,
  () => {
    resetForm({ values: getInitialValues() });
  },
);

defineExpose({
  setErrors,
});

const submit = handleSubmit((values, actions) => {
  emit("submit", {
    id: props.user?.id,
    email: values.email,
    password: values.password || undefined,
    roleName: values.roleName,
    firstName: values.firstName,
    lastName: values.lastName,
    isActive: values.isActive,
    branchId: values.branchId,
  });
});
</script>
