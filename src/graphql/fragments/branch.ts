import gql from "graphql-tag";

export const BRANCH_FIELDS = gql`
  fragment BranchFields on BranchNode {
    address
    id
    isActive
    name
  }
`;
