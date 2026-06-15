import { BRANCH_FIELDS } from "@/graphql/fragments/branch";
import { PAGINATION } from "@/graphql/fragments/common";
import gql from "graphql-tag";

export const ALL_BRANCHES = gql`
  ${BRANCH_FIELDS}
  ${PAGINATION}
  query allBranches($first: Int, $offset: Int) {
    allBranches(first: $first, offset: $offset) {
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
