import { useEffect } from "react";
import { useRouter } from "../../../hooks/use-router";
import useAuth from "../../../hooks/use-auth";
import { PATHS } from "../../../configs/path.config";
import { LoadingScreen } from "../../atoms/loading-screen";

const IndexRoute = () => {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!isLoggedIn) {
      return router.replace(PATHS.LOGIN);
    } else {
      return router.replace(PATHS.HOME);
    }
  }, [isLoggedIn, router, isLoading]);

  return <LoadingScreen />;
};

export default IndexRoute;
