import { PATHS } from "../../../configs/path.config";
import React, { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LoadingScreen } from "../loading-screen";
import { getAccessToken } from "../../../utils/local-storage";

const PrivateGuard: React.FC = () => {
  const hasToken = getAccessToken();

  if (!hasToken) {
    return <Navigate to={PATHS.LOGIN} replace />;
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  );
};

export default PrivateGuard;
