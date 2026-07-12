import gql from "graphql-tag";
import { BRANCH_FIELDS, BRANCH_HOURS_FIELDS } from "@/graphql/branch/fragments";

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

export const SYNC_BRANCH_HOUR = gql`
  ${BRANCH_HOURS_FIELDS}
  mutation syncBranchHour($input: SyncBranchHourInput!) {
    syncBranchHour(input: $input) {
      branchHours {
        ...BranchHoursFields
      }
    }
  }
`;
