<template>
  <v-layout>
    <v-navigation-drawer
      v-model="drawer"
      floating
      color="grey-lighten-3"
      width="270"
    >
      <v-list nav>
        <v-list-item title="Home" link></v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block append-icon="mdi-logout" :loading @click="onLogout">
            {{ $t("layouts.dashboard.logout") }}
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar elevation="1">
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
        v-if="$vuetify.display.mobile"
      />
      <v-app-bar-title class="font-weight-semibold">
        {{ $t("layouts.dashboard.appTitle") }}
      </v-app-bar-title>
    </v-app-bar>

    <v-main class="overflow-y-auto h-screen">
      <router-view />
    </v-main>
  </v-layout>
</template>
<script lang="ts" setup>
import { useRevokeRefreshToken } from "@/graphql/composables/auth";
import { useAuthCookie } from "@/composables/useAuthCookie";
import { useRouter } from "vue-router";

const { mutate: revokeToken, loading } = useRevokeRefreshToken();
const { deleteCookies, refresh } = useAuthCookie();
const router = useRouter();

const drawer = ref(true);

function onLogout() {
  if (refresh) {
    revokeToken({
      refreshToken: refresh,
    });
  }

  deleteCookies();

  router.push("/");
}
</script>
