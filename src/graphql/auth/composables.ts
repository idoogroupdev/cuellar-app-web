import type { UserNode } from "@/graphql/entities/user";
import {
  LOGIN,
  REVOKE_TOKEN,
  REQUEST_AUTH_CODE,
  VERIFY_AUTH_CODE,
  RESET_PASSWORD,
} from "@/graphql/auth/mutations";
import { useMutation } from "@vue/apollo-composable";

// Login

interface LoginPayload {
  email: string;
  exp: number;
  origIat: number;
}

interface LoginMutation {
  login: {
    payload: LoginPayload;
    refreshExpiresIn: number;
    token: string;
    refreshToken: string;
    user: UserNode;
  };
}

interface LoginMutationVariables {
  email: string;
  password: string;
}

export function useLogin() {
  return useMutation<LoginMutation, LoginMutationVariables>(LOGIN);
}

// RevokeToken

interface RevokeTokenMutation {
  revoked: boolean;
}

interface RevokeTokenMutationVariables {
  refreshToken: string;
}

export function useRevokeRefreshToken() {
  return useMutation<RevokeTokenMutation, RevokeTokenMutationVariables>(
    REVOKE_TOKEN,
  );
}

// RequestAuthCode

interface RequestAuthCodeMutation {
  requestAuthCode: {
    message: string;
  };
}

type AuthCode = "REGISTRATION" | "PASSWORD_RECOVERY";

interface RequestAuthCodeMutationVariables {
  input: {
    email: string;
    authCode: AuthCode;
  };
}

export function useRequestAuthCode() {
  return useMutation<RequestAuthCodeMutation, RequestAuthCodeMutationVariables>(
    REQUEST_AUTH_CODE,
  );
}

// verifyAuthCode

export interface VerifyAuthCodeMutation {
  verifyAuthCode: {
    payload: LoginPayload;
    refreshExpiresIn: number;
    token: string;
    refreshToken: string;
    user: UserNode;
  };
}

interface VerifyAuthCodeMutationVariables {
  input: {
    email: string;
    code: string;
    authCode: AuthCode;
  };
}

export function useVerifyAuthCode() {
  return useMutation<VerifyAuthCodeMutation, VerifyAuthCodeMutationVariables>(
    VERIFY_AUTH_CODE,
  );
}

// resetPassword

interface ResetPasswordMutation {
  resetPassword: {
    user: {
      email: string;
    };
  };
}

interface ResetPasswordMutationVariables {
  input: {
    newPassword: string;
  };
}

export function useResetPassword() {
  return useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(
    RESET_PASSWORD,
  );
}
