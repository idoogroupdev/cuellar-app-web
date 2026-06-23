<route lang="yaml">
meta:
  layout: dashboard
</route>
<template>
  <h1 class="text-h5 font-weight-bold mb-6 pa-4">
    {{ $t("sections.users") }}
  </h1>

  <v-alert v-if="error" type="error" class="mb-6" :text="error.message" />

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

        <SelectRole @update:model="onRoleUpdate" />

        <UserFormModal
          v-if="hasPermission('add', 'user')"
          @saved="(user) => search()"
        />
      </div>
    </template>

    <template v-slot:item="{ item }">
      <tr class="text-no-wrap">
        <td>{{ item.email }}</td>
        <td>{{ getFullName(item) }}</td>
        <td>{{ item.role?.name ? $t(`roles.${item.role.name}`) : "-" }}</td>
        <td>
          <v-chip
            :color="item.isActive ? 'success' : 'grey'"
            size="small"
            variant="tonal"
          >
            {{
              item.isActive ? $t("forms.isActive") : $t("users.table.inactive")
            }}
          </v-chip>
        </td>
        <td>
          <UserFormModal
            v-if="hasPermission('change', 'user')"
            @saved="(user) => search()"
            :user="item"
          >
            <template #activator="{ props }">
              <v-btn
                density="compact"
                icon="mdi-pencil"
                variant="text"
                v-bind="props"
              />
            </template>
          </UserFormModal>
        </td>
      </tr>
    </template>
  </v-data-table-server>
</template>
<script lang="ts" setup>
import { useAllUsers } from "@/graphql/composables/user";
import { useLocale } from "vuetify";
import { useAppStore } from "@/stores/app";
import { getOrderBy, getFullName } from "@/lib/helpers";

const { t } = useLocale();
const { hasPermission } = useAppStore();
const {
  allUsers,
  loading,
  load,
  search,
  page,
  query,
  orderBy,
  itemsPerPage,
  roleName,
  error,
} = useAllUsers({
  keyParam: "",
});
const itemsPerPageOptions = [10, 25, 50, 100];

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
  {
    title: t("actions"),
  },
]);

const users = computed(() => allUsers.value.edges.map((edge) => edge.node));

function onClearSearch() {
  query.value = undefined;
  search();
}

function onOptionsUpdate(options: {
  page: number;
  itemsPerPage: number;
  sortBy: { key: string; order: "asc" | "desc" }[];
}) {
  const [sort] = options.sortBy;
  orderBy.value = sort ? getOrderBy(sort.key, sort.order) : undefined;

  const itemsPerPageChanged = itemsPerPage.value !== options.itemsPerPage;
  itemsPerPage.value = options.itemsPerPage;

  page.value = itemsPerPageChanged ? 1 : options.page;
  load();
}

function onRoleUpdate(role: string | undefined) {
  if (roleName) {
    roleName.value = role;
    load();
  }
}
</script>
