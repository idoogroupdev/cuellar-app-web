export type RoleName =
  | "OPERATOR"
  | "BRANCH_OPERATOR"
  | "ADMIN"
  | "SALESPERSON"
  | "DELIVERY_DRIVER"
  | "CLIENT"
  | (string & {});

export interface RoleNode {
  id: string;
  name: RoleName;
}
