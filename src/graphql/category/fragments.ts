import gql from "graphql-tag";

export const CATEGORY_FIELDS = gql`
  fragment CategoryFields on CategoryNode {
    id
    name
    isActive
    sortOrder
    subcategories {
      id
      isActive
      name
      sortOrder
    }
  }
`;
