<template>
  <v-container
    class="fill-height d-flex flex-column align-center justify-center"
  >
    <PasswordRecoveryOtpStep
      :loading="verifyAuthCodeLoading"
      :re-sending="reSendAuthCodeLoading"
      @re-send="onResendCode"
      @submit="onSubmit"
    />
  </v-container>
</template>
<script lang="ts" setup>
import { useAuthCookie } from "@/composables/useAuthCookie";
import {
  useRequestAuthCode,
  useVerifyAuthCode,
} from "@/graphql/composables/auth";
import { useAppStore } from "@/stores/app";
import { useMessagesStore } from "@/stores/messages";
import { useRouter } from "vue-router";
import { useLocale } from "vuetify";
const { setCookie } = useAuthCookie();

const {
  mutate: reSendAuthCode,
  loading: reSendAuthCodeLoading,
  onError: reSendAuthCodeOnError,
} = useRequestAuthCode();

const {
  mutate: verifyAuthCode,
  loading: verifyAuthCodeLoading,
  onError: verifyAuthCodeOnError,
  onDone,
} = useVerifyAuthCode();

const messages = useMessagesStore();
const app = useAppStore();
const router = useRouter();
const { t } = useLocale();

const onResendCode = () => {
  if (!app.passwdRecoveryEmail) {
    router.push("/forgot-password");
    return;
  }

  reSendAuthCode({
    input: { email: app.passwdRecoveryEmail, authCode: "PASSWORD_RECOVERY" },
  });
};

const onSubmit = (values: { otp: string }) => {
  if (!app.passwdRecoveryEmail) {
    router.push("/forgot-password");
    return;
  }

  verifyAuthCode({
    input: {
      email: app.passwdRecoveryEmail,
      code: values.otp,
      authCode: "PASSWORD_RECOVERY",
    },
  });
};

onDone(async ({ data }) => {
  if (
    data?.verifyAuthCode.user.isStaff ||
    data?.verifyAuthCode.user.isSuperuser
  ) {
    app.setUser(data.verifyAuthCode.user);
    app.setPermissions(data.verifyAuthCode.user.permissions);
    setCookie([
      {
        name: "token",
        value: data.verifyAuthCode.token,
      },
      {
        name: "refresh",
        value: data.verifyAuthCode.refreshToken,
      },
    ]);

    router.push("/forgot-password/reset-password");
  } else {
    messages.add({
      text: t("errors.notAccess"),
      color: "error",
    });
  }
});

reSendAuthCodeOnError((error) => {
  messages.add({
    text: error?.message,
    color: "error",
  });
});

verifyAuthCodeOnError((error) => {
  messages.add({
    text: error?.message,
    color: "error",
  });
});
</script>
