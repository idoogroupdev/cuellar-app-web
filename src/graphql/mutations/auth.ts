import gql from "graphql-tag";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      payload
      refreshExpiresIn
      token
      refreshToken
      user {
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
    }
  }
`;
