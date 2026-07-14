import gql from "graphql-tag";
import { CATEGORY_FIELDS } from "@/graphql/category/fragments";
import { PAGINATION } from "@/graphql/common/fragments";

export const ALL_CATEGORIES = gql`
  ${CATEGORY_FIELDS}
  ${PAGINATION}
  query allCategories(
    $first: Int
    $offset: Int
    $isActive: Boolean
    $name_Icontains: String
    $parent_Isnull: Boolean
  ) {
    allCategories(
      first: $first
      offset: $offset
      isActive: $isActive
      name_Icontains: $name_Icontains
      parent_Isnull: $parent_Isnull
    ) {
      edges {
        cursor
        node {
          ...CategoryFields
        }
      }
      pagination {
        ...PaginationInfo
      }
    }
  }
`;
