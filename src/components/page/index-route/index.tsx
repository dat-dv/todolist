import { useEffect } from "react";
import { useRouter } from "../../../hooks/use-router";
import useAuth from "../../../hooks/use-auth";
import { PATHS } from "../../../configs/path.config";

const IndexRoute = () => {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!isLoggedIn) {
      return router.replace(PATHS.LOGIN);
    }
  }, [isLoggedIn, router, isLoading]);

  return <></>;
};

export default IndexRoute;
