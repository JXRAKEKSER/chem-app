import type { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import { useUserStore } from "@/store/user.store";

import { ROUTE_NAMES } from "../meta/route.names";

const authGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const { meta } = to;
  if (!meta.protected) {
    return next();
  }
  
  const userStore = useUserStore();
  if (userStore.user) {
    return next();
  }
  try {
    await userStore.setUser();
  } catch (error) {
    return next({ name: ROUTE_NAMES.AUTH.LOGIN });
  }
  next();
};

export { authGuard };
