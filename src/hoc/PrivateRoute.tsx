import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { ROUTE_PATHS } from "@/constants";
import AppLoading from "@/components/AppLoading";

interface IProps {
  component: React.ComponentType;
  requiredRole?: string;
}

const PrivateRoute = ({ component: Component, requiredRole }: IProps) => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    // Only run the check after loading is complete
    if (!isAuthenticated) {
      return navigate(ROUTE_PATHS.LOGIN);
    }

    if (requiredRole && user?.role !== requiredRole) {
      return navigate(ROUTE_PATHS.HOME);
    }
  }, [isAuthenticated, user, requiredRole, navigate, loading]);

  if (loading) {
    return <AppLoading fullScreen size="large" />;
  }

  return isAuthenticated && (!requiredRole || user?.role === requiredRole) ? (
    <Component />
  ) : null;
};

export default PrivateRoute;
