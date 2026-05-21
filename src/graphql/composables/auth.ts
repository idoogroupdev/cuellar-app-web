import { LOGIN } from "@/graphql/mutations/auth";
import { useMutation } from "@vue/apollo-composable";
import type { UserNode } from "@/graphql/entities/user";

export interface LoginPayload {
  email: string;
  exp: number;
  origIat: number;
}

export interface LoginMutation {
  login: {
    payload: LoginPayload;
    refreshExpiresIn: number;
    token: string;
    refreshToken: string;
    user: UserNode;
  };
}

export interface LoginMutationVariables {
  email: string;
  password: string;
}

export function useLogin() {
  return useMutation<LoginMutation, LoginMutationVariables>(LOGIN);
}
