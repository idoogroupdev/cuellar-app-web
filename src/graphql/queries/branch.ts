import { BRANCH_FIELDS } from "@/graphql/fragments/branch";
import { PAGINATION } from "@/graphql/fragments/common";
import gql from "graphql-tag";

export const ALL_BRANCHES = gql`
  ${BRANCH_FIELDS}
  ${PAGINATION}
  query allBranches(
    $first: Int
    $offset: Int
    $isActive: Boolean
    $name_Icontains: String
  ) {
    allBranches(
      first: $first
      offset: $offset
      isActive: $isActive
      name_Icontains: $name_Icontains
    ) {
      edges {
        cursor
        node {
          ...BranchFields
        }
      }
      pagination {
        ...PaginationInfo
      }
    }
  }
`;
