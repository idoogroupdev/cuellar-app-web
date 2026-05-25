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
        {{ $t("auth.forms.passwordRecoveryOtpStep.title") }}
      </h1>
      <p class="text-grey-darken-2">
        {{ $t("auth.forms.passwordRecoveryOtpStep.description") }}
      </p>
    </div>
    <v-form @submit.prevent="submit" class="pa-4">
      <!-- @vue-ignore -->
      <v-otp-input
        v-model="otp.value.value"
        :error-messages="otp.errorMessage.value"
      ></v-otp-input>
      <v-btn
        class="mt-6"
        type="submit"
        block
        append-icon="mdi-arrow-right"
        :loading
      >
        {{ $t("auth.forms.passwordRecoveryOtpStep.verify") }}</v-btn
      >
    </v-form>
  </v-sheet>
</template>
<script lang="ts" setup>
import * as z from "zod";
import { useForm, useField } from "vee-validate";

const emit = defineEmits<{
  submit: [{ otp: string }];
}>();

const props = withDefaults(
  defineProps<{
    loading: boolean;
  }>(),
  {
    loading: false,
  },
);

const passwordRecoveryOtpSchema = z.object({
  otp: z.string().min(6),
});

const { handleSubmit } = useForm({
  validationSchema: passwordRecoveryOtpSchema,
});

const otp = useField("otp");

const submit = handleSubmit((values) => {
  emit("submit", values);
});
</script>
