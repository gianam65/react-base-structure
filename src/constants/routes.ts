import { lazy } from "react";
import { APP_LAYOUT, APP_ROLE } from "./configs";

export const ROUTE_PATHS = Object.freeze({
  HOME: "/",
  LOGIN: "/login",
});

export interface RouteConfig<Props = Record<string, never>> {
  path: string;
  component: React.LazyExoticComponent<React.ComponentType<Props>>;
  layout: APP_LAYOUT;
  requiredRole?: string; // Role depend on app requirement
}

export const ROUTES: RouteConfig[] = [
  {
    path: ROUTE_PATHS.HOME,
    component: lazy(() => import(`@/pages/index`)),
    layout: APP_LAYOUT.BASE,
  },
  {
    path: ROUTE_PATHS.LOGIN,
    component: lazy(() => import(`@/pages/LoginPage`)),
    layout: APP_LAYOUT.LOGIN,
  },
  {
    path: "/admin",
    component: lazy(() => import(`@/pages/AdminPage`)),
    layout: APP_LAYOUT.BASE,
    requiredRole: APP_ROLE.ADMIN,
  },
  {
    path: "*",
    component: lazy(() => import(`@/pages/NotFoundPage`)),
    layout: APP_LAYOUT.NOT_FOUND,
  },
];
