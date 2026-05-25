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

export const REVOKE_TOKEN = gql`
  mutation revokeToken($refreshToken: String) {
    revokeToken(refreshToken: $refreshToken) {
      revoked
    }
  }
`;

export const REQUEST_AUTH_CODE = gql`
  mutation requestAuthCode($input: RequestAuthCodeInput!) {
    requestAuthCode(input: $input) {
      message
    }
  }
`;

export const VERIFY_AUTH_CODE = gql`
  mutation verifyAuthCode($input: VerifyAuthCodeInput!) {
    verifyAuthCode(input: $input) {
      payload
      refreshExpiresIn
      refreshToken
      token
      user {
        email
        firstName
        isStaff
        isSuperuser
        role {
          name
        }
        permissions {
          codename
        }
      }
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      user {
        email
      }
    }
  }
`;
