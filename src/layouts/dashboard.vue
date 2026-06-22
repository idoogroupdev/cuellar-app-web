<template>
  <v-layout>
    <v-navigation-drawer v-model="drawer" floating color="primary" width="270">
      <v-list nav>
        <v-list-item>
          <div class="d-flex justify-center flex-column align-center">
            <v-img width="120" src="@/assets/logo-v2.png" />
          </div>
        </v-list-item>
        <v-divider />
        <div v-for="section in menu" :key="section.title">
          <v-list-item
            v-if="section.items.length === 1"
            :active="firstItem(section.items).active"
            active-class="bg-blue-darken-3"
            density="compact"
            fluid
            link
            rounded="lg"
            @click="router.push(firstItem(section.items).to)"
          >
            <template #prepend>
              <v-icon :icon="section.icon" />
            </template>
            <template #title>
              <span class="">
                {{ section.title }}
              </span>
            </template>
          </v-list-item>
          <!-- <v-list-group v-else fluid>
            <template #activator="{ props }">
              <v-list-item
                :active="groupItem.active"
                active-class="bg-grey-lighten-5"
                v-bind="props"
                density="compact"
                rounded="lg"
              >
                <template #prepend>
                  <v-icon :icon="groupItem.icon" />
                </template>
                <template #title>
                  <span class="font-weight-light">
                    {{ groupItem.title }}
                  </span>
                </template>
              </v-list-item>
            </template>
            <v-list-item
              v-for="item in groupItem.items"
              :key="item.title"
              :active="item.active"
              active-class="bg-grey-darken-5"
              class="mt-1"
              density="compact"
              link
              rounded="lg"
              @click="router.push(item.to)"
            >
              <template #prepend>
                <v-icon icon="mdi-circle" size="24" />
              </template>
              <span class="font-weight-light">
                {{ item.title }}
              </span>
            </v-list-item>
          </v-list-group> -->
        </div>
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
import { useAuthCookie } from "@/composables/useAuthCookie";
import { useRevokeRefreshToken } from "@/graphql/composables/auth";
import { hasRouteAccess } from "@/lib/has-route-access";
import type { PermissionsType, SectionType } from "@/stores/app";
import { useAppStore } from "@/stores/app";
import { useRoute, useRouter } from "vue-router";
import { useLocale } from "vuetify";
import type { RoleName } from "@/graphql/entities/roles";

const { mutate: revokeToken, loading } = useRevokeRefreshToken();
const { deleteCookies, refresh } = useAuthCookie();
const router = useRouter();
const route = useRoute();
const { hasPermission } = useAppStore();
const { t } = useLocale();

const drawer = ref(true);

async function onLogout() {
  deleteCookies();
  if (refresh) {
    await revokeToken({
      refreshToken: refresh,
    });
  }
  router.push("/");
}

interface DrawerItem {
  title: string;
  to: string;
  active: boolean;
}

type DrawerItemConfig = {
  title: string;
  to: string;
  route: string;
  requiredPermission?: {
    permission: PermissionsType;
    section: SectionType;
    roles?: RoleName[];
  };
};

type DrawerSectionConfig = {
  title: string;
  icon: string;
  route: string;
  items: DrawerItemConfig[];
};

const drawerSectionConfig: DrawerSectionConfig[] = [
  {
    title: "sections.users",
    icon: "mdi-account-group",
    route: "/(private)/dashboard/users/",
    items: [
      {
        title: "sections.users",
        to: "/dashboard/users/",
        route: "/(private)/dashboard/users/",
        requiredPermission: {
          permission: "view",
          section: "user",
          roles: ["ADMIN"],
        },
      },
    ],
  },
];

const menu = computed(() => {
  const items = [];

  for (const section of drawerSectionConfig) {
    const filteredItems = section.items.filter(
      (item) =>
        !item.requiredPermission ||
        hasPermission(
          item.requiredPermission.permission,
          item.requiredPermission.section,
          item.requiredPermission.roles,
        ),
    );

    if (filteredItems.length === 0) {
      continue;
    }

    items.push({
      title: t(section.title),
      icon: section.icon,
      active: route.name.includes(section.route),
      items: filteredItems.map((item) => ({
        title: t(item.title),
        to: item.to,
        active: route.name === item.route,
      })),
    });
  }

  return items;
});

function firstItem(items: DrawerItem[]) {
  const item = items[0];

  if (!items || !item)
    return {
      active: false,
      to: "#",
    };

  return item;
}
</script>
