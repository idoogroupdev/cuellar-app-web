<template>
  <v-app>
    <router-view />
    <v-snackbar-queue
      v-model="messages.queue"
      variant="tonal"
      :close-text="$t('close')"
      location="top right"
    ></v-snackbar-queue>
  </v-app>
</template>

<script lang="ts" setup>
import { useMessagesStore } from "@/stores/messages";

const messages = useMessagesStore();
</script>
