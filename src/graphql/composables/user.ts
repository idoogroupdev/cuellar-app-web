import type { UserNode } from "@/graphql/entities/user";
import { CREATE_USER, UPDATE_USER } from "@/graphql/mutations/user";
import { useMutation } from "@vue/apollo-composable";

export interface CreateUserInput {
  email: string;
  password: string;
  roleName: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
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

export interface UpdateUserInput {
  id: string;
  password?: string;
  roleName: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
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
