import type { UserNode } from "@/graphql/entities/user";
import {
  LOGIN,
  REVOKE_TOKEN,
  REQUEST_AUTH_CODE,
} from "@/graphql/mutations/auth";
import { useMutation } from "@vue/apollo-composable";

// Login

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

// RevokeToken

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

// RequestAuthCode

export interface RequestAuthCodeMutation {
  requestAuthCode: {
    message: string;
  };
}

export interface RequestAuthCodeMutationVariables {
  input: {
    email: string;
    authCode: "REGISTRATION" | "PASSWORD_RECOVERY";
  };
}

export function useRequestAuthCode() {
  return useMutation<RequestAuthCodeMutation, RequestAuthCodeMutationVariables>(
    REQUEST_AUTH_CODE,
  );
}
