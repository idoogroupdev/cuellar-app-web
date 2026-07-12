import gql from "graphql-tag";

export const PAGINATION = gql`
  fragment PaginationInfo on PaginationInfo {
    currentPage
    hasPreviousPage
    totalCount
    totalPages
    hasNextPage
  }
`;
