import { Suspense } from "react";
import {
  Route,
  Outlet,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import App from "../App";
import { GuestGuard } from "../components/atoms/guest-guard";
import { authRoutes } from "./auth-routes";
import { PATHS } from "../configs/path.config";
import NotFoundPage from "../components/page/not-found";
import { LoadingScreen } from "../components/atoms/loading-screen";
import { PrivateGuard } from "../components/atoms/private-guard";
import HomePage from "../components/page/home";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        element={
          <PrivateGuard>
            <Outlet />
          </PrivateGuard>
        }
      >
        <Route index element={<HomePage />} />
      </Route>

      <Route
        element={
          <Suspense fallback={<LoadingScreen />}>
            <GuestGuard>
              <Outlet />
            </GuestGuard>
          </Suspense>
        }
      >
        {authRoutes.map((item) => (
          <Route key={item.path} path={item?.path} element={item?.element} />
        ))}
      </Route>

      {/* Error Routes */}
      <Route path={PATHS.NOT_FOUND} element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);
