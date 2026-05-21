import type { UserNode } from "@/graphql/entities/user";
import { LOGIN, REVOKE_TOKEN } from "@/graphql/mutations/auth";
import { useMutation } from "@vue/apollo-composable";

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

export interface RevokeTokenMutation {
  revoked: boolean;
}

export interface RevokeTokenMutationVariables {
  refreshToken: string;
}

export function useRevokeRefreshToken() {
  return useMutation<RevokeTokenMutation, RevokeTokenMutationVariables>(
    REVOKE_TOKEN,
  );
}
