import { useState, useEffect } from "react";

import { LoadingScreen } from "../loading-screen";
import { getAccessToken } from "../../../utils/local-storage";
import { PATHS } from "../../../configs/path.config";
import { useRouter } from "../../../hooks/use-router";

type TPrivateGuardProps = {
  children: React.ReactNode;
};

export function PrivateGuard({ children }: TPrivateGuardProps) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState<boolean>(true);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      router.replace(PATHS.LOGIN);
      return;
    }
    setIsChecking(false);
  }, [router]);

  if (isChecking) {
    return <LoadingScreen />;
  }

  return children;
}
