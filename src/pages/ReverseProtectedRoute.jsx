import Spinner from "@/components/ui/Spinner";
import useAuthStore from "@/store/authStore";
import { Navigate } from "react-router-dom";

function ReverseProtectedRoute({ children }) {
  const { user, isAuthLoading } = useAuthStore();

  if (isAuthLoading) return <Spinner />;

  if (user) return <Navigate to="/todos" replace />;

  return children;
}

export default ReverseProtectedRoute;
