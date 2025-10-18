import { Suspense } from "react";
import { Outlet } from "react-router";
import { LoadingScreen } from "../loading-screen";

export function GuestGuard() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  );
}
