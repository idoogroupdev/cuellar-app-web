import { ApolloError } from "@apollo/client";

type FieldErrors = Record<string, string>;

export function normalizeApolloError(error: ApolloError | null) {
  if (!error) return;

  const errors: FieldErrors = {};

  for (const gqlError of error.graphQLErrors) {
    const code = gqlError.extensions?.code;

    if (code === "VALIDATION_ERROR") {
      const fields = gqlError.extensions?.fields as FieldErrors;

      if (fields && typeof fields === "object") {
        for (const [key, value] of Object.entries(
          fields as Record<string, string | string[]>,
        )) {
          errors[key] = Array.isArray(value) ? (value[0] ?? "") : value;
        }
      }
    }
  }

  return errors;
}
