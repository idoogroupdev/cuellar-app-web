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
    username
    phone
    cashbackBalance
    permissions {
      codename
      id
    }
    role {
      id
      name
    }
    branch {
      id
      name
      address
      isActive
    }
  }
`;
