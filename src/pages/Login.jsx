import Logo from "@/components/ui/Logo";
import SpinnerMini from "@/components/ui/SpinnerMini";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuthStore from "@/store/authStore";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, login, isAuthLoading } = useAuthStore();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    await login({ email, password });
    setPassword("");
  }

  useEffect(() => {
    if (user) {
      navigate("/todos");
    }
  }, [user, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-md"
        onSubmit={handleSubmit}
      >
        <Logo size="lg" />

        <div className="space-y-4">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            autoFocus
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="bg-purple-500 hover:bg-purple-700"
          disabled={isAuthLoading}
        >
          {isAuthLoading ? <SpinnerMini /> : "Login"}
        </Button>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-purple-600 hover:underline">
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
