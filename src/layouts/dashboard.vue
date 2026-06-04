<template>
  <v-layout>
    <v-navigation-drawer
      v-model="drawer"
      floating
      color="grey-lighten-5"
      width="270"
    >
      <v-list nav>
        <v-list-item>
          <div class="d-flex justify-center flex-column align-center">
            <v-img width="120" src="@/assets/logo-v2.png" />
            <h2>{{ $t("appTitle") }}</h2>
          </div>
        </v-list-item>
        <v-divider />
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
    <v-app-bar elevation="0">
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
        v-if="$vuetify.display.mobile"
      />

      <Breadcrumbs />
    </v-app-bar>

    <v-main class="overflow-y-auto h-screen">
      <v-container fluid>
        <router-view v-if="hasRouteAccess()" />
        <v-alert v-else :text="$t('errors.notAccess')" type="warning" />
      </v-container>
    </v-main>
  </v-layout>
</template>
<script lang="ts" setup>
import { useRevokeRefreshToken } from "@/graphql/composables/auth";
import { useAuthCookie } from "@/composables/useAuthCookie";
import { useRouter } from "vue-router";
import { hasRouteAccess } from "@/lib/has-route-access";

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
