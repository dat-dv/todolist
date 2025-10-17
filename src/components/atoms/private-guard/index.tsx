import { LoadingScreen } from "../loading-screen";
import { PATHS } from "../../../configs/path.config";
import { useRouter } from "../../../hooks/use-router";
import useAuth from "../../../hooks/use-auth";
import { useEffect } from "react";

type TPrivateGuardProps = {
  children: React.ReactNode;
};

export function PrivateGuard({ children }: TPrivateGuardProps) {
  const router = useRouter();

  const { isLoading, isLoggedIn, user } = useAuth();

  useEffect(() => {
    if (!user?.username && !isLoading) {
      router.replace(PATHS.LOGIN);
    }
  }, [router, isLoggedIn, isLoading, user]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return children;
}
