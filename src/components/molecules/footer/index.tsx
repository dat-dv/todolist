import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { PATHS } from "../../../configs/path.config";
import useAuth from "../../../hooks/use-auth";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { user } = useAuth();
  const location = useLocation();

  const FOOTER_LINKS = useMemo(
    () => [
      {
        path: user?.id ? PATHS.HOME : PATHS.LOGIN,
        label: "Home",
        activePaths: [PATHS.HOME],
      },
      {
        path: PATHS.REGISTER,
        label: "Register",
        activePaths: [PATHS.REGISTER],
      },
      {
        path: PATHS.LOGIN,
        label: "Login",
        activePaths: [PATHS.LOGIN],
      },
    ],
    [user?.id]
  );

  const isActive = (activePaths: string[]) =>
    activePaths.includes(location.pathname);

  return (
    <footer className="mx-12 flex flex-col sm:flex-row justify-between items-center gap-4 py-4 border-t">
      <p className="text-sm text-gray-400 text-center sm:text-left">
        © {currentYear} TodoList. Licensed under MIT License.
      </p>
      <nav className="flex gap-6">
        {FOOTER_LINKS.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className={`
              text-sm transition-colors
              ${
                isActive(link.activePaths)
                  ? "text-primary font-semibold"
                  : "text-gray-400 hover:text-primary"
              }
            `}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </footer>
  );
};

export default Footer;
