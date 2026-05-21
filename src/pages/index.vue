<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <Login @submit="onSubmit" :loading="loading" />
  </v-container>
</template>

<script lang="ts" setup>
import { useLogin } from "@/graphql/composables/auth";
import { useMessagesStore } from "@/stores/messages";
import { useAppStore } from "@/stores/app";
import { useAuthCookie } from "@/composables/useAuthCookie";

const { mutate: login, loading, onError, onDone } = useLogin();
const messages = useMessagesStore();
const { setCookie } = useAuthCookie();

const onSubmit = (values: { email: string; password: string }) => {
  login({ email: values.email, password: values.password });
};

onError((error) => {
  messages.add({
    text: error?.message,
    color: "error",
  });
});

onDone(async ({ data }) => {
  console.log(data);
});
</script>
