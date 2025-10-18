import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import App from "../App";
import { GuestGuard } from "../components/atoms/guest-guard";
import { authRoutes } from "./auth-routes";
import { PATHS } from "../configs/path.config";
import NotFoundPage from "../components/page/not-found";
import HomePage from "../components/page/home";
import PrivateGuard from "../components/atoms/private-guard";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route element={<PrivateGuard />}>
        <Route index element={<HomePage />} />
      </Route>

      <Route element={<GuestGuard />}>
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
