<template>
  <v-app>
    <router-view />
    <v-snackbar-queue
      v-model="messages.queue"
      variant="tonal"
      total-visible="5"
      display-strategy="overflow"
      closable
      :close-text="$t('close')"
    ></v-snackbar-queue>
  </v-app>
</template>

<script lang="ts" setup>
import { useMessagesStore } from "@/stores/messages";

const messages = useMessagesStore();
</script>
