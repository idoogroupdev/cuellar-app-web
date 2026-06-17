import { useAppStore } from "@/stores/app";
import { useRoute } from "vue-router";

export function hasRouteAccess() {
  const route = useRoute();
  const { hasPermission } = useAppStore();

  if (route.name == "/(private)/dashboard/users/") {
    return hasPermission("view", "user", "ADMIN");
  }

  return true;
}
