<template>
  <v-select
    :label="$t('branches.select')"
    :items="branches"
    item-title="name"
    item-value="id"
    :error-messages="error?.message"
    :loading
  >
    <template #append-item v-if="hasMore">
      <div class="d-flex justify-center">
        <Button
          :block="false"
          variant="text"
          @click="
            page = page + 1;
            load();
          "
        >
          {{ $t("showMoreOptions") }}
        </Button>
      </div>
    </template>
  </v-select>
</template>
<script setup lang="ts">
import { useAllBranches } from "@/graphql/composables/branch";
import { type BranchNode } from "@/graphql/entities/branch";

const { error, onResult, loading, page, load } = useAllBranches({
  updateRoute: false,
  isActive: true,
});

const branches = ref<BranchNode[]>([]);
const hasMore = ref(true);

onResult(({ data }) => {
  if (data?.allBranches) {
    const existingBranches = new Set(branches.value.map((p) => p.id));

    const uniqueBranches = data.allBranches.edges
      .filter((p) => !existingBranches.has(p.node.id))
      .map((p) => p.node);

    if (uniqueBranches.length > 0) {
      branches.value.push(...uniqueBranches);
    } else {
      hasMore.value = false;
    }
  }
});
</script>
