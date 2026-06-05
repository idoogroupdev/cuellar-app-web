import gql from "graphql-tag";
import { USER_FIELDS } from "@/graphql/fragments/user";

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
