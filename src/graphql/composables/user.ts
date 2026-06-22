import type {
  Pagination,
  CommonParams,
  ComposableQueryArgs,
} from "@/graphql/entities/common";
import type { UserNode } from "@/graphql/entities/user";
import { CREATE_USER, UPDATE_USER } from "@/graphql/mutations/user";
import { ALL_USERS } from "@/graphql/queries/user";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { PAGE_SIZE, DEFAULT_PAGINATION } from "@/graphql/composables/constants";
import { useQueryParams } from "@/composables/useQueryParams";
import type { RoleName } from "@/graphql/entities/roles";

// All users

export interface AllUsersQueryVariables {
  first?: number;
  offset?: number;
  email_Icontains?: string;
  firstName_Icontains?: string;
  lastName_Icontains?: string;
  role_Name?: RoleName;
  orderBy?: string;
}

interface UserEdge {
  cursor: string;
  node: UserNode;
}

interface AllUsersQuery {
  allUsers: {
    edges: UserEdge[];
    pagination: Pagination;
  };
}

const emptyAllUsers: AllUsersQuery["allUsers"] = DEFAULT_PAGINATION;

export function useAllUsers({
  updateRoute = true,
  limit = PAGE_SIZE,
  keyParam = "allUsers",
  roleName = undefined,
}: ComposableQueryArgs = {}) {
  interface AllUsersQueryParams extends CommonParams {
    roleName?: string;
  }

  const defaults: AllUsersQueryParams = {
    page: 1,
    itemsPerPage: limit,
    query: undefined,
    orderBy: undefined,
    roleName: roleName,
  };

  const queryParams = useQueryParams();

  const state = ref(queryParams.read(keyParam, defaults));

  function getVariables(): AllUsersQueryVariables {
    const query = state.value.query?.trim() || undefined;

    return {
      first: state.value.itemsPerPage,
      offset: (state.value.page - 1) * state.value.itemsPerPage,
      firstName_Icontains: query,
      lastName_Icontains: query,
      email_Icontains: query,
      role_Name: state.value.roleName,
      orderBy: state.value.orderBy,
    };
  }

  const queryReturn = useQuery<AllUsersQuery, AllUsersQueryVariables>(
    ALL_USERS,
    getVariables(),
  );

  const allUsers = computed(
    () => queryReturn.result.value?.allUsers ?? emptyAllUsers,
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
    allUsers,
    load,
    search,
  };
}

// Create user

export interface CreateUserInput {
  email: string;
  password: string;
  roleName: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  branchId?: string;
}

interface CreateUserMutation {
  createUser: {
    user: UserNode;
  };
}

interface CreateUserMutationVariables {
  input: CreateUserInput;
}

export function useCreateUser() {
  return useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CREATE_USER,
  );
}

// Update user

export interface UpdateUserInput {
  id: string;
  password?: string;
  roleName: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  branchId?: string;
}

interface UpdateUserMutation {
  updateUser: {
    user: UserNode;
  };
}

interface UpdateUserMutationVariables {
  input: UpdateUserInput;
}

export function useUpdateUser() {
  return useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UPDATE_USER,
  );
}
