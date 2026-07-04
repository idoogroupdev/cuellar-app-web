import { useQueryParams } from "@/composables/useQueryParams";
import { DEFAULT_PAGINATION, PAGE_SIZE } from "@/graphql/composables/constants";
import { type BranchNode } from "@/graphql/entities/branch";
import type {
  CommonParams,
  ComposableQueryArgs,
  Pagination,
} from "@/graphql/entities/common";
import { CREATE_BRANCH, UPDATE_BRANCH } from "@/graphql/mutations/branch";
import { ALL_BRANCHES } from "@/graphql/queries/branch";
import { useMutation, useQuery } from "@vue/apollo-composable";

// All branches

export interface AllBranchesQueryVariables {
  first?: number;
  offset?: number;
  isActive?: boolean;
  name_Icontains?: string;
}

interface BranchEdge {
  cursor: string;
  node: BranchNode;
}

interface AllBranchesQuery {
  allBranches: {
    edges: BranchEdge[];
    pagination: Pagination;
  };
}

const emptyAllBranches: AllBranchesQuery["allBranches"] = DEFAULT_PAGINATION;

export function useAllBranches({
  updateRoute = true,
  limit = PAGE_SIZE,
  keyParam = "allBranches",
  isActive = null,
}: ComposableQueryArgs = {}) {
  interface AllBranchesQueryParams extends CommonParams {
    isActive?: boolean;
  }

  const defaults: AllBranchesQueryParams = {
    page: 1,
    itemsPerPage: limit,
    query: undefined,
    orderBy: undefined,
    isActive: isActive,
  };

  const queryParams = useQueryParams();

  const state = ref(queryParams.read(keyParam, defaults));

  function getVariables(): AllBranchesQueryVariables {
    return {
      first: state.value.itemsPerPage,
      offset: (state.value.page - 1) * state.value.itemsPerPage,
      isActive: state.value.isActive,
      name_Icontains: state.value.query,
    };
  }

  const queryReturn = useQuery<AllBranchesQuery, AllBranchesQueryVariables>(
    ALL_BRANCHES,
    getVariables(),
  );

  const allBranches = computed(
    () => queryReturn.result.value?.allBranches ?? emptyAllBranches,
  );

  function load() {
    if (updateRoute) {
      queryParams.write(keyParam, state.value);
    }

    queryReturn.refetch(getVariables());
  }

  function search() {
    state.value.page = 1;
    load();
  }

  return {
    ...queryReturn,
    ...toRefs(state.value),
    allBranches,
    load,
    search,
  };
}

// Create branch

interface CreateBranchInput {
  name: string;
  address: string;
  isActive: boolean;
  isPickupEnabled: boolean;
}

interface CreateBranchMutation {
  createBranch: {
    branch: BranchNode;
  };
}

interface CreateBranchMutationVariables {
  input: CreateBranchInput;
}

export function useCreateBranch() {
  return useMutation<CreateBranchMutation, CreateBranchMutationVariables>(
    CREATE_BRANCH,
  );
}

// Update branch

interface UpdateBranchInput {
  id: string;
  name?: string;
  address?: string;
  isActive?: boolean;
  isPickupEnabled?: boolean;
}

interface UpdateBranchMutation {
  updateBranch: {
    branch: BranchNode;
  };
}

interface UpdateBranchMutationVariables {
  input: UpdateBranchInput;
}

export function useUpdateBranch() {
  return useMutation<UpdateBranchMutation, UpdateBranchMutationVariables>(
    UPDATE_BRANCH,
  );
}
