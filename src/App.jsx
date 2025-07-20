import { Toaster } from "sonner";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Todos from "./pages/Todos";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Signup from "./pages/Signup";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} richColors />

        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/todos"
            element={
              <ProtectedRoute>
                <Todos />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
