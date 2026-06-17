import { useAppStore } from "@/stores/app";
import { useRoute } from "vue-router";

export function hasRouteAccess() {
  const route = useRoute();
  const { hasPermission, user } = useAppStore();

  if (route.name == "/(private)/dashboard/users/") {
    return hasPermission("view", "user") && user.role?.name === "ADMIN";
  }

  return true;
}
