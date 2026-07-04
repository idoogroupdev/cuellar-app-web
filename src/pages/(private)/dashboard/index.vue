<route lang="yaml">
meta:
  layout: dashboard
</route>
<template>
  <v-container>
    <h1>{{ $t("dashboard") }}</h1>
    <v-row>
      <v-col v-for="card in cards" :key="card.title" cols="12" sm="6">
        <v-card class="mx-auto" v-if="card.isVisible">
          <v-card-item>
            <v-card-title>
              <v-icon>{{ card.icon }}</v-icon>
              {{ card.title }}
            </v-card-title>
          </v-card-item>
          <v-card-text>
            {{ card.description }}
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" :to="card.to" append-icon="mdi-arrow-right">
              {{ $t("go") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts" setup>
import { useAppStore } from "@/stores/app";
import { useLocale } from "vuetify";

const { t } = useLocale();
const { hasPermission } = useAppStore();

interface Card {
  title: string;
  description: string;
  icon: string;
  to: string;
  isVisible: boolean;
}

const cards = computed<Card[]>(() => {
  return [
    {
      title: t("sections.users"),
      description: t("home.manageUsers"),
      icon: "mdi-account-multiple",
      to: "/dashboard/users/",
      isVisible: hasPermission("view", "user", ["ADMIN"]),
    },
    {
      title: t("sections.clients"),
      description: t("home.manageClients"),
      icon: "mdi-account-multiple",
      to: "/dashboard/clients/",
      isVisible: hasPermission("view", "user", ["ADMIN", "OPERATOR"]),
    },
  ];
});
</script>
