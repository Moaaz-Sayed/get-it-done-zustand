import useAuthStore from "@/store/authStore";
import { Button } from "./button";
import CustomAlertDialog from "./CustomAlertDialog";
import Logo from "./Logo";
import SpinnerMini from "./SpinnerMini";

function Header() {
  const { user, logout, isAuthLoading } = useAuthStore();
  const name = user?.user_metadata?.username || user?.email || "User";

  async function handleLogout() {
    await logout();
  }

  return (
    <header className="mx-auto mb-8 flex max-w-2xl items-center justify-between">
      <Logo size="lg" />
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold text-purple-200">{name}</h2>

        <CustomAlertDialog
          onConfirm={handleLogout}
          title="Log out?"
          description="Are you sure you want to log out? This action will end your session."
          cancelText="Stay"
          actionText={isAuthLoading ? <SpinnerMini /> : "Log out"}
          trigger={
            <Button size="lg" variant="destructive" disabled={isAuthLoading}>
              {isAuthLoading ? <SpinnerMini /> : "Log out"}
            </Button>
          }
        />
      </div>
    </header>
  );
}

export default Header;
