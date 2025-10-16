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

  const { isLoading, isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      router.replace(PATHS.LOGIN);
    }
  }, [router, isLoggedIn, isLoading]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return children;
}
