import gql from "graphql-tag";
import { CATEGORY_FIELDS } from "@/graphql/category/fragments";

export const CREATE_CATEGORY = gql`
  ${CATEGORY_FIELDS}
  mutation createCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      category {
        ...CategoryFields
      }
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  ${CATEGORY_FIELDS}
  mutation updateCategory($input: UpdateCategoryInput!) {
    updateCategory(input: $input) {
      category {
        ...CategoryFields
      }
    }
  }
`;
