<template>
  <v-sheet class="mx-auto" width="350">
    <v-img height="150" src="@/assets/logo-v2.png" />
    <div class="text-center mb-8">
      <h1 class="mb-1">{{ $t("auth.forms.login.title") }}</h1>
      <p class="text-grey-darken-2">
        {{ $t("auth.forms.login.description") }}
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
      <v-text-field
        :label="$t('forms.password')"
        type="password"
        v-model="password.value.value"
        :error-messages="password.errorMessage.value"
        prepend-inner-icon="$lock"
      />

      <div class="text-right mt-n3">
        <RouterLink
          class="text-decoration-none text-primary text-body-medium font-weight-medium"
          :to="forgotPasswordUrl"
        >
          {{ $t("auth.forms.login.forgotPassword") }}
        </RouterLink>
      </div>

      <v-btn
        class="mt-6"
        type="submit"
        block
        append-icon="mdi-arrow-right"
        :loading
      >
        {{ $t("auth.forms.login.submit") }}</v-btn
      >
    </v-form>
  </v-sheet>
</template>
<script lang="ts" setup>
import * as z from "zod";
import { useForm, useField } from "vee-validate";
import { RouterLink } from "vue-router";

const emit = defineEmits<{
  submit: [{ email: string; password: string }];
}>();

const props = withDefaults(
  defineProps<{
    loading: boolean;
    forgotPasswordUrl: string;
  }>(),
  {
    loading: false,
    forgotPasswordUrl: "#",
  },
);

const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

const { handleSubmit } = useForm({
  validationSchema: LoginSchema,
});

const email = useField("email");
const password = useField("password");

const submit = handleSubmit((values) => {
  emit("submit", values);
});
</script>
