import { Suspense } from "react";
import {
  Route,
  Outlet,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import App from "../App";
import { GuestGuard } from "../components/atoms/guest-guard";
import { authRoutes } from "./auth-routes";
import IndexRoute from "../components/page/index-route";
import { PATHS } from "../configs/path.config";
import NotFoundPage from "../components/page/not-found";
import { LoadingScreen } from "../components/atoms/loading-screen";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        path="/"
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
      <Route path="*" element={<Navigate to={PATHS.NOT_FOUND} replace />} />
      <Route path="/" element={<IndexRoute />} />
      <Route path="" index element={<IndexRoute />} />
    </Route>
  )
);
