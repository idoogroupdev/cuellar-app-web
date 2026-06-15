import type { BranchNode } from "@/graphql/entities/branch";
import type { PermissionNode } from "@/graphql/entities/permission";
import type { RoleNode } from "@/graphql/entities/roles";

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
}
