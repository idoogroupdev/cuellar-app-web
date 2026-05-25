import type { PermissionNode } from "@/graphql/entities/permission";
import type { UserNode } from "@/graphql/entities/user";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
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

  return {
    permissions,
    user,
    passwdRecoveryEmail,
    setPermissions,
    setUser,
    setPasswdRecoveryEmail,
  };
});
