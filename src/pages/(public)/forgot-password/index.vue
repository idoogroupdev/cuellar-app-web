<template>
  <v-container
    class="fill-height d-flex flex-column align-center justify-center"
  >
    <PasswordRecoveryEmailStep @submit="onSubmit" :loading="loading" />
  </v-container>
</template>
<script setup lang="ts">
import { useRequestAuthCode } from "@/graphql/composables/auth";
import { useMessagesStore } from "@/stores/messages";
import { useAppStore } from "@/stores/app";
import { useRouter } from "vue-router";

const {
  mutate: requestAuthCode,
  loading,
  onError,
  onDone,
} = useRequestAuthCode();
const messages = useMessagesStore();
const app = useAppStore();
const router = useRouter();

const onSubmit = (values: { email: string }) => {
  requestAuthCode({
    input: { email: values.email, authCode: "PASSWORD_RECOVERY" },
  });

  app.setPasswdRecoveryEmail(values.email);
};

onError((error) => {
  messages.add({
    text: error?.message,
    color: "error",
  });
});

onDone(async ({ data }) => {
  if (data?.requestAuthCode.message) {
    router.push("/forgot-password/check");
  }
});
</script>
