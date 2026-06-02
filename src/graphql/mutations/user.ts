import gql from "graphql-tag";

const USER_FIELDS = gql`
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

export const CREATE_USER = gql`
  ${USER_FIELDS}
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      user {
        ...UserFields
      }
    }
  }
`;

export const UPDATE_USER = gql`
  ${USER_FIELDS}
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      user {
        ...UserFields
      }
    }
  }
`;
