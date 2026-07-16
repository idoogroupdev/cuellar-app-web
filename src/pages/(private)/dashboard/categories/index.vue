<route lang="yaml">
meta:
  layout: dashboard
</route>
<template>
  <h1 class="text-h5 font-weight-bold mb-6 pa-4">
    {{ $t("sections.categories") }}
  </h1>

  <v-alert v-if="error" type="error" class="mb-6" :text="error.message" />

  <v-data-table-server
    v-model:page="page"
    :headers="headers"
    :items="categories"
    :loading="loading"
    :items-per-page="itemsPerPage"
    :items-per-page-options="itemsPerPageOptions"
    item-value="id"
    density="comfortable"
    @update:options="onOptionsUpdate"
    :no-data-text="$t('categories.table.empty')"
    :items-length="allCategories.pagination.totalCount"
  >
    <template #top>
      <div
        class="d-flex flex-column flex-sm-row justify-space-between ga-4 pa-4"
      >
        <v-text-field
          v-model="query"
          :label="$t('categories.table.search')"
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
        <CategoryFormModal
          v-if="hasPermission('add', 'category', ['ADMIN', 'OPERATOR'])"
          @saved="(category) => search()"
        />
      </div>
    </template>
    <template v-slot:item="{ item }">
      <tr class="text-no-wrap">
        <td>{{ item.name }}</td>
        <td>
          <v-chip
            :color="item.isActive ? 'success' : 'grey'"
            size="small"
            variant="tonal"
          >
            {{ item.isActive ? $t("forms.isActive") : $t("forms.inactive") }}
          </v-chip>
        </td>
        <td>
          <CategoryFormModal
            v-if="hasPermission('change', 'category', ['ADMIN', 'OPERATOR'])"
            @saved="(category) => search(page)"
            :category="item"
          >
            <template #activator="{ props }">
              <v-btn
                density="compact"
                icon="mdi-pencil"
                variant="text"
                v-bind="props"
              />
            </template>
          </CategoryFormModal>
        </td>
      </tr>
    </template>
  </v-data-table-server>
</template>
<script setup lang="ts">
import { useAllCategories } from "@/graphql/category/composables";
import { useLocale } from "vuetify";
import { useAppStore } from "@/stores/app";

const { t } = useLocale();
const { hasPermission } = useAppStore();
const {
  allCategories,
  error,
  page,
  loading,
  itemsPerPage,
  load,
  search,
  query,
} = useAllCategories({
  keyParam: "",
  skipWriteParams: ["parentIsnull"],
});

const itemsPerPageOptions = [10, 25, 50, 100];

const headers = computed(() => [
  {
    title: t("forms.name"),
    sortable: false,
  },
  {
    title: t("forms.isActive"),
    sortable: false,
  },
  {
    title: t("actions"),
  },
]);

const categories = computed(() =>
  allCategories.value.edges.map((edge) => edge.node),
);

function onClearSearch() {
  query.value = undefined;
  search();
}

function onOptionsUpdate(options: {
  page: number;
  itemsPerPage: number;
  sortBy: { key: string; order: "asc" | "desc" }[];
}) {
  const itemsPerPageChanged = itemsPerPage.value !== options.itemsPerPage;
  itemsPerPage.value = options.itemsPerPage;

  page.value = itemsPerPageChanged ? 1 : options.page;
  load();
}
</script>
