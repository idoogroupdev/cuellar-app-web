<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <Login @submit="onSubmit" :loading="loading" />
  </v-container>
</template>

<script lang="ts" setup>
import { useLogin } from "@/graphql/composables/auth";
import { useMessagesStore } from "@/stores/messages";

const { mutate: login, loading, onError } = useLogin();

const onSubmit = (values: { email: string; password: string }) => {
  login({ email: values.email, password: values.password });
};

const messages = useMessagesStore();

onError((error) => {
  messages.add({
    text: error?.message,
    color: "error",
  });
});
</script>
