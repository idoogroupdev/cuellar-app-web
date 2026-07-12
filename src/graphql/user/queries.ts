import gql from "graphql-tag";
import { USER_FIELDS } from "@/graphql/user/fragments";
import { PAGINATION } from "@/graphql/fragments/common";

export const ALL_USERS = gql`
  ${USER_FIELDS}
  ${PAGINATION}
  query allUsers(
    $first: Int
    $offset: Int
    $email_Icontains: String
    $firstName_Icontains: String
    $lastName_Icontains: String
    $phone_Icontains: String
    $role_Name: String
    $orderBy: String
  ) {
    allUsers(
      first: $first
      offset: $offset
      email_Icontains: $email_Icontains
      firstName_Icontains: $firstName_Icontains
      lastName_Icontains: $lastName_Icontains
      phone_Icontains: $phone_Icontains
      role_Name: $role_Name
      orderBy: $orderBy
    ) {
      edges {
        cursor
        node {
          ...UserFields
        }
      }
      pagination {
        ...PaginationInfo
      }
    }
  }
`;
