import { lazy } from "react";
import { APP_LAYOUT } from "./configs";

export const ROUTE_PATHS = Object.freeze({
  HOME: "/",
  LOGIN: "/login",
});

export interface RouteConfig<Props = Record<string, never>> {
  path: string;
  component: React.LazyExoticComponent<React.ComponentType<Props>>;
  layout: APP_LAYOUT;
}

export const ROUTES: RouteConfig[] = [
  {
    path: ROUTE_PATHS.HOME,
    component: lazy(() => import(`../pages/index`)),
    layout: APP_LAYOUT.BASE,
  },
  {
    path: ROUTE_PATHS.LOGIN,
    component: lazy(() => import(`../pages/LoginPage`)),
    layout: APP_LAYOUT.LOGIN,
  },
  {
    path: "*",
    component: lazy(() => import(`../pages/NotFoundPage`)),
    layout: APP_LAYOUT.NOT_FOUND,
  },
];
