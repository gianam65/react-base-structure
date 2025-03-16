import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES, RouteConfig } from "@/constants";
import AppGlobalStyles from "@/components/AppGlobalStyles";
import { AppBaseLayout, AppLoginLayout, AppNotFoundLayout } from "@/layouts";
import { APP_LAYOUT } from "@/constants";
import { ErrorBoundary } from "react-error-boundary";
import AppErrorFallback from "@/components/AppErrorFallback";

const queryClient = new QueryClient();
const { VITE_BASE_NAME = "/" } = import.meta.env;

const getLayoutForRoute = (routeLayout: APP_LAYOUT) => {
  const layoutMap = {
    [APP_LAYOUT.BASE]: AppBaseLayout,
    [APP_LAYOUT.LOGIN]: AppLoginLayout,
    [APP_LAYOUT.NOT_FOUND]: AppNotFoundLayout,
  };
  return layoutMap[routeLayout] || AppBaseLayout;
};

const renderRoute = (route: RouteConfig) => {
  const LayoutComponent = getLayoutForRoute(route.layout);
  return (
    <Route
      key={route.path}
      path={route.path}
      element={
        <ErrorBoundary FallbackComponent={AppErrorFallback}>
          <Suspense fallback={<div>Loading...</div>}>
            <AppGlobalStyles>
              <LayoutComponent>
                <route.component />
              </LayoutComponent>
            </AppGlobalStyles>
          </Suspense>
        </ErrorBoundary>
      }
    />
  );
};

function App() {
  return (
    <BrowserRouter basename={VITE_BASE_NAME}>
      <QueryClientProvider client={queryClient}>
        <Routes>{ROUTES.map(renderRoute)}</Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
