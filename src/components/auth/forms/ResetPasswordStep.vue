<template>
  <v-sheet width="400" class="mx-auto d-flex flex-column ga-5">
    <div>
      <v-btn
        variant="text"
        prepend-icon="mdi-arrow-left"
        @click="$router.go(-1)"
      >
        {{ $t("back") }}
      </v-btn>
    </div>
    <div class="text-center">
      <h1>
        {{ $t("auth.forms.resetPassword.title") }}
      </h1>
      <p class="text-grey-darken-2">
        {{ $t("auth.forms.resetPassword.description") }}
      </p>
    </div>
    <v-form @submit.prevent="submit" class="pa-4 d-flex flex-column ga-2">
      <v-text-field
        :label="$t('forms.password')"
        type="password"
        v-model="password.value.value"
        :error-messages="password.errorMessage.value"
        prepend-inner-icon="$lock"
      />
      <v-text-field
        :label="$t('forms.newPassword')"
        type="password"
        v-model="confirmation_password.value.value"
        :error-messages="confirmation_password.errorMessage.value"
        prepend-inner-icon="$lock"
      />
      <v-btn
        class="mt-6"
        type="submit"
        block
        append-icon="mdi-arrow-right"
        :loading
      >
        {{ $t("auth.forms.passwordRecoveryEmailStep.submit") }}</v-btn
      >
    </v-form>
  </v-sheet>
</template>
<script setup lang="ts">
import * as z from "zod";
import { useForm, useField } from "vee-validate";
import { useLocale } from "vuetify";

const emit = defineEmits<{
  submit: [{ password: string }];
}>();

const props = withDefaults(
  defineProps<{
    loading: boolean;
  }>(),
  {
    loading: false,
  },
);

const { t } = useLocale();

const ResetPasswordSchema = z
  .object({
    password: z.string().min(8),
    confirmation_password: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmation_password, {
    error: () => t("errors.passwordNotMatch"),
    path: ["confirmation_password"],
  });

const { handleSubmit } = useForm({
  validationSchema: ResetPasswordSchema,
});

const password = useField("password");
const confirmation_password = useField("confirmation_password");

const submit = handleSubmit((values) => {
  emit("submit", {
    password: values.password,
  });
});
</script>
