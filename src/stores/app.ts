import type { PermissionNode } from "@/graphql/entities/permission";
import type { UserNode } from "@/graphql/entities/user";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
  const permissions = ref([] as PermissionNode[]);
  const user = ref({} as UserNode);

  function setPermissions(data: PermissionNode[]) {
    permissions.value = data;
  }

  function setUser(data: UserNode) {
    user.value = data;
  }

  return { permissions, user, setPermissions, setUser };
});
