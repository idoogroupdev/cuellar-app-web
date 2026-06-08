<route lang="yaml">
meta:
  layout: dashboard
</route>
<template>
  <div class="pa-6">
    <div class="d-flex align-center justify-space-between mb-6 ga-4">
      <div>
        <h1 class="text-h5 font-weight-bold">{{ $t("sections.users") }}</h1>
      </div>
    </div>

    <v-data-table-server
      v-model:page="page"
      :headers="headers"
      :items="users"
      :loading="loading"
      :items-per-page="itemsPerPage"
      :items-per-page-options="itemsPerPageOptions"
      item-value="id"
      density="comfortable"
      @update:options="onOptionsUpdate"
      :no-data-text="$t('users.table.empty')"
      :items-length="allUsers.pagination.totalCount"
    >
      <template #top>
        <div
          class="d-flex flex-column flex-sm-row justify-space-between ga-4 pa-4"
        >
          <v-text-field
            v-model="query"
            :label="$t('users.table.search')"
            clearable
            hide-details
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            @click:clear="onClearSearch"
            @keyup.enter="search"
          >
            <template #append-inner>
              <v-btn
                :loading="loading"
                density="comfortable"
                icon="mdi-arrow-right"
                size="small"
                variant="text"
                @click="search"
              />
            </template>
          </v-text-field>

          <UserFormModal
            v-if="hasPermission('add', 'user')"
            v-model="modalIsOpen"
            :roles="roles"
            @saved="(user) => search()"
          />
        </div>
      </template>

      <template v-slot:item="{ item }">
        <tr class="text-no-wrap">
          <td>{{ item.email }}</td>
          <td>{{ getFullName(item) }}</td>
          <td>{{ item.role?.name ?? "-" }}</td>
          <td>
            <v-chip
              :color="item.isActive ? 'success' : 'grey'"
              size="small"
              variant="tonal"
            >
              {{
                item.isActive
                  ? $t("forms.isActive")
                  : $t("users.table.inactive")
              }}
            </v-chip>
          </td>
        </tr>
      </template>
    </v-data-table-server>
  </div>
</template>
<script lang="ts" setup>
import { useAllUsers } from "@/graphql/composables/user";
import type { UserNode } from "@/graphql/entities/user";
import { useLocale } from "vuetify";
import { useAppStore } from "@/stores/app";

const { t } = useLocale();
const { hasPermission } = useAppStore();
const { allUsers, loading, load, search, page, query, orderBy, itemsPerPage } =
  useAllUsers({
    keyParam: "",
  });
const itemsPerPageOptions = [10, 25, 50, 100];

const modalIsOpen = ref(false);
const roles = [
  {
    name: "OPERATOR",
    id: "1",
  },
  {
    name: "BRANCH_OPERATOR",
    id: "2",
  },
  {
    name: "ADMIN",
    id: "3",
  },
  {
    name: "SALESPERSON",
    id: "4",
  },
  {
    name: "DELIVERY_DRIVER",
    id: "5",
  },
];

const headers = computed(() => [
  {
    title: t("forms.email"),
    key: "email",
    sortable: true,
  },
  {
    title: t("users.table.name"),
    key: "firstName",
    sortable: true,
  },
  {
    title: t("forms.role"),
    key: "role.name",
    sortable: false,
  },
  {
    title: t("forms.isActive"),
    key: "isActive",
    sortable: true,
  },
]);

const users = computed(() => allUsers.value.edges.map((edge) => edge.node));

function getFullName(user: UserNode) {
  return [user.firstName, user.lastName].filter(Boolean).join(" ") || "-";
}

function onClearSearch() {
  query.value = undefined;
  search();
}

function getOrderBy(key: string, order: "asc" | "desc") {
  const orderByFields: Record<string, string> = {
    email: "email",
    firstName: "first_name",
    isActive: "is_active",
  };
  const field = orderByFields[key];
  return field ? `${order === "desc" ? "-" : ""}${field}` : undefined;
}

function onOptionsUpdate(options: {
  page: number;
  itemsPerPage: number;
  sortBy: { key: string; order: "asc" | "desc" }[];
}) {
  const [sort] = options.sortBy;
  const itemsPerPageChanged = itemsPerPage.value !== options.itemsPerPage;

  itemsPerPage.value = options.itemsPerPage;
  page.value = itemsPerPageChanged ? 1 : options.page;
  orderBy.value = sort ? getOrderBy(sort.key, sort.order) : undefined;
  load();
}
</script>
