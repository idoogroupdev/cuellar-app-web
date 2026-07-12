<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <Login
      @submit="onSubmit"
      :loading="loading"
      forgot-password-url="/forgot-password"
    />
  </v-container>
</template>

<script lang="ts" setup>
import { useAuthCookie } from "@/composables/useAuthCookie";
import { useLogin } from "@/graphql/auth/composables";
import { useAppStore } from "@/stores/app";
import { useMessagesStore } from "@/stores/messages";
import { useRouter } from "vue-router";
import { useLocale } from "vuetify";

const { mutate: login, loading, onError, onDone } = useLogin();
const { t } = useLocale();
const router = useRouter();
const messages = useMessagesStore();
const app = useAppStore();
const { setCookie } = useAuthCookie();

const onSubmit = (values: { email: string; password: string }) => {
  login(
    { email: values.email, password: values.password },
    {
      context: {
        skipAuth: true,
      },
    },
  );
};

onError((error) => {
  messages.add({
    text: error?.message,
    color: "error",
  });
});

onDone(async ({ data }) => {
  if (data?.login.user.isStaff || data?.login.user.isSuperuser) {
    app.setUser(data.login.user);
    app.setPermissions(data.login.user.permissions);
    setCookie([
      {
        name: "token",
        value: data.login.token,
      },
      {
        name: "refresh",
        value: data.login.refreshToken,
      },
    ]);

    router.push("/dashboard/");
  } else {
    messages.add({
      text: t("errors.notAccess"),
      color: "error",
    });
  }
});
</script>
