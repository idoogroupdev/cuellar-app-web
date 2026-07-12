import gql from "graphql-tag";

export const BRANCH_HOURS_FIELDS = gql`
  fragment BranchHoursFields on BranchHourNode {
    dayOfWeek
    fromHour
    id
    toHour
  }
`;

export const BRANCH_FIELDS = gql`
  ${BRANCH_HOURS_FIELDS}
  fragment BranchFields on BranchNode {
    address
    id
    isActive
    name
    isPickupEnabled
    branchHours {
      ...BranchHoursFields
    }
  }
`;
