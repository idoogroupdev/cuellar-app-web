<template>
  <v-container
    class="fill-height d-flex flex-column align-center justify-center"
  >
    <ResetPasswordStep
      :loading="loading"
      @submit="onSubmit"
      :errors="{ password: normalizeApolloError(error)?.password }"
    />
  </v-container>
</template>
<script setup lang="ts">
import { useResetPassword } from "@/graphql/composables/auth";
import { useRouter } from "vue-router";
import { normalizeApolloError } from "@/lib/helpers";

const { mutate: resetPassword, loading, onDone, error } = useResetPassword();
const router = useRouter();

const onSubmit = (values: { password: string }) => {
  resetPassword({
    input: {
      newPassword: values.password,
    },
  });
};

onDone(async ({ data }) => {
  if (data?.resetPassword.user) {
    router.push("/dashboard");
  }
});
</script>
