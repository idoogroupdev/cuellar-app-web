import gql from "graphql-tag";
import { BRANCH_FIELDS } from "@/graphql/fragments/branch";

export const CREATE_BRANCH = gql`
  ${BRANCH_FIELDS}
  mutation createBranch($input: CreateBranchInput!) {
    createBranch(input: $input) {
      branch {
        ...BranchFields
      }
    }
  }
`;

export const UPDATE_BRANCH = gql`
  ${BRANCH_FIELDS}
  mutation updateBranch($input: UpdateBranchInput!) {
    updateBranch(input: $input) {
      branch {
        ...BranchFields
      }
    }
  }
`;
