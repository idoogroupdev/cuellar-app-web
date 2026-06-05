import gql from "graphql-tag";

export const USER_FIELDS = gql`
  fragment UserFields on UserNode {
    email
    firstName
    id
    isActive
    isStaff
    isSuperuser
    isVerified
    lastName
    permissions {
      codename
      id
    }
    role {
      id
      name
    }
    username
  }
`;
