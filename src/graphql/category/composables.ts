import type {
  Pagination,
  CommonParams,
  ComposableQueryArgs,
} from "@/graphql/common/entities";
import type { CategoryNode } from "@/graphql/category/entities";
import { ALL_CATEGORIES } from "@/graphql/category/queries";
import { useQuery } from "@vue/apollo-composable";
import { PAGE_SIZE, DEFAULT_PAGINATION } from "@/graphql/common/constants";
import { useQueryParams } from "@/composables/useQueryParams";

// All categories

interface AllCategoriesQueryVariables {
  first?: number;
  offset?: number;
  isActive?: boolean;
  name_Icontains?: string;
  parent_Isnull?: boolean;
}

interface CategoryEdge {
  cursor: string;
  node: CategoryNode;
}

interface AllCategoriesQuery {
  allCategories: {
    edges: CategoryEdge[];
    pagination: Pagination;
  };
}

const emptyAllCategories: AllCategoriesQuery["allCategories"] =
  DEFAULT_PAGINATION;

export function useAllCategories({
  updateRoute = true,
  limit = PAGE_SIZE,
  keyParam = "allCategories",
  parentIsnull = true,
  skipWriteParams = [],
}: ComposableQueryArgs = {}) {
  interface AllCategoriesQueryParams extends CommonParams {
    isActive?: boolean;
    nameIcontains?: string;
    parentIsnull?: boolean;
  }

  const defaults: AllCategoriesQueryParams = {
    page: 1,
    itemsPerPage: limit,
    query: undefined,
    orderBy: undefined,
    parentIsnull: parentIsnull,
  };

  const queryParams = useQueryParams();

  const state = ref(queryParams.read(keyParam, defaults));

  function getVariables(): AllCategoriesQueryVariables {
    const query = state.value.query ? String(state.value.query) : undefined;

    return {
      first: state.value.itemsPerPage,
      offset: (state.value.page - 1) * state.value.itemsPerPage,
      name_Icontains: query,
      isActive: state.value.isActive,
      parent_Isnull: state.value.parentIsnull,
    };
  }

  const queryReturn = useQuery<AllCategoriesQuery, AllCategoriesQueryVariables>(
    ALL_CATEGORIES,
    getVariables(),
  );

  const allCategories = computed(
    () => queryReturn.result.value?.allCategories ?? emptyAllCategories,
  );

  function load() {
    if (updateRoute) {
      const writableState = { ...state.value };

      for (const paramName of skipWriteParams) {
        delete (writableState as any)[paramName];
      }

      queryParams.write(keyParam, writableState);
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
    allCategories,
    load,
    search,
  };
}
