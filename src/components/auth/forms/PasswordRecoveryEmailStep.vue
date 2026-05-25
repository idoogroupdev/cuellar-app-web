<template>
  <v-sheet class="mx-auto" width="350">
    <div class="text-center mb-8">
      <h1 class="mb-1">
        {{ $t("auth.forms.passwordRecoveryEmailStep.title") }}
      </h1>
      <p class="text-grey-darken-2">
        {{ $t("auth.forms.passwordRecoveryEmailStep.description") }}
      </p>
    </div>
    <v-form @submit.prevent="submit" class="pa-4">
      <v-text-field
        :label="$t('forms.email')"
        type="email"
        v-model="email.value.value"
        :error-messages="email.errorMessage.value"
        prepend-inner-icon="$email"
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
<script lang="ts" setup>
import * as z from "zod";
import { useForm, useField } from "vee-validate";

const emit = defineEmits<{
  submit: [{ email: string }];
}>();

const props = withDefaults(
  defineProps<{
    loading: boolean;
  }>(),
  {
    loading: false,
  },
);

const passwordRecoveryEmailSchema = z.object({
  email: z.email(),
});

const { handleSubmit } = useForm({
  validationSchema: passwordRecoveryEmailSchema,
});

const email = useField("email");

const submit = handleSubmit((values) => {
  emit("submit", values);
});
</script>
