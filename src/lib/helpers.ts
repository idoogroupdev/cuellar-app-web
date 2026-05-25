import { ApolloError } from "@apollo/client";

interface FieldErrors {
  [attributeName: string]: string;
}

export function normalizeApolloError(error: ApolloError | null) {
  if (!error) return;

  //   TODO: use custom ApolloError with typing

  const errors: FieldErrors = {};

  for (const formattedError of error.graphQLErrors) {
    if (formattedError.extensions?.code === "VALIDATION_ERROR") {
      const fields = formattedError.extensions?.fields as FieldErrors;
      for (const key in fields) {
        let value = fields[key] as string | string[];
        if (Array.isArray(value)) {
          value = value[0] as string;
        }
        errors[key] = value;
      }
    }
  }

  return errors;
}
