import gql from "graphql-tag";
import { USER_FIELDS } from "@/graphql/fragments/user";
import { PAGE_INFO } from "@/graphql/fragments/common";

export const ALL_USERS = gql`
  ${USER_FIELDS}
  ${PAGE_INFO}
  query allUsers(
    $first: Int
    $offset: Int
    $email_Icontains: String
    $firstName_Icontains: String
    $lastName_Icontains: String
    $orderBy: String
  ) {
    allUsers(
      first: $first
      offset: $offset
      email_Icontains: $email_Icontains
      firstName_Icontains: $firstName_Icontains
      lastName_Icontains: $lastName_Icontains
      orderBy: $orderBy
    ) {
      edges {
        cursor
        node {
          ...UserFields
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`;
