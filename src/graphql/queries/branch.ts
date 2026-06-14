import { BRANCH_FIELDS } from "@/graphql/fragments/branch";
import { PAGINATION } from "@/graphql/fragments/common";
import gql from "graphql-tag";

export const ALL_BRANCHES = gql`
  ${BRANCH_FIELDS}
  ${PAGINATION}
  query allUsers($first: Int, $offset: Int) {
    allUsers(first: $first, offset: $offset) {
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
