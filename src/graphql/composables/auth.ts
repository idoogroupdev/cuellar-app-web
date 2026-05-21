import { LOGIN } from "@/graphql/mutations/auth";
import { useMutation } from "@vue/apollo-composable";

export function useLogin() {
  return useMutation(LOGIN);
}
