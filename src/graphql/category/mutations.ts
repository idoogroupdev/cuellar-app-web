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

export const DELETE_CATEGORY = gql`
  mutation deleteCategory($input: DeleteCategoryInput!) {
    deleteCategory(input: $input) {
      success
    }
  }
`;

export const SYNC_SUBCATEGORIES = gql`
  mutation syncSubcategories($input: SyncSubcategoriesInput!) {
    syncSubcategories(input: $input) {
      success
    }
  }
`;
