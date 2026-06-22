import type { UserNode } from "@/graphql/entities/user";
import type { GraphQLFormattedError } from "graphql";

type FieldErrors = Record<string, string>;

export function normalizeApolloError(
  _errors: readonly GraphQLFormattedError[] | undefined,
) {
  if (!_errors) return;

  const errors: FieldErrors = {};

  for (const gqlError of _errors) {
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

export function isNumeric(str: string): boolean {
  return !Number.isNaN(Number.parseFloat(str)) && Number.isFinite(Number(str));
}

export function getOrderBy(key: string, order: "asc" | "desc") {
  return key ? `${order === "desc" ? "-" : ""}${key}` : undefined;
}

export function getFullName(user: UserNode) {
  return [user.firstName, user.lastName].filter(Boolean).join(" ") || "-";
}
