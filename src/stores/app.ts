import type { PermissionNode } from "@/graphql/entities/permission";
import type { UserNode } from "@/graphql/entities/user";
import { defineStore } from "pinia";
import type { RoleName } from "@/graphql/entities/roles";

export type PermissionsType = "view" | "add" | "change" | "delete";

// This is the codename permission in Django for
// easy understanding in the UI I will call it section
export type SectionType = "user";

export const useAppStore = defineStore(
  "app",
  () => {
    const permissions = ref([] as PermissionNode[]);
    const user = ref({} as UserNode);
    // this store the email of the user that is trying to recover the password
    const passwdRecoveryEmail = ref<null | string>();

    function setPermissions(data: PermissionNode[]) {
      permissions.value = data;
    }

    function setUser(data: UserNode) {
      user.value = data;
    }

    function setPasswdRecoveryEmail(email: string) {
      passwdRecoveryEmail.value = email;
    }

    function hasPermission(
      permission: PermissionsType,
      section: SectionType,
      roles?: RoleName[],
    ) {
      const requestPermission = `${permission}_${section}`;

      const has_permission = permissions.value.some(
        (p) => p.codename === requestPermission,
      );

      const has_role = roles
        ? roles.some((role) => user.value.role?.name === role)
        : true;

      return has_permission && has_role;
    }

    return {
      permissions,
      user,
      passwdRecoveryEmail,
      setPermissions,
      setUser,
      setPasswdRecoveryEmail,
      hasPermission,
    };
  },
  {
    persist: true,
  },
);
