import Spinner from "@/components/ui/Spinner";
import useAuthStore from "@/store/authStore";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { user, isAuthLoading } = useAuthStore();

  if (isAuthLoading) return <Spinner />;

  if (!user) return <Navigate to="/login" replace />;

  return children;
}

export default ProtectedRoute;
