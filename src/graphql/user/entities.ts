import type { BranchNode } from "@/graphql/branch/entities";
import type { PermissionNode } from "@/graphql/permission/entities";
import type { RoleNode } from "@/graphql/roles/entities";

export interface UserNode {
  id: string;
  isSuperuser: boolean;
  username: string;
  firstName: string;
  lastName: string;
  isStaff: boolean;
  isActive: boolean;
  email: string;
  role: RoleNode | null;
  isVerified: boolean;
  permissions: PermissionNode[];
  branch: BranchNode | null;
  phone: string | null;
  cashbackBalance: string;
}
