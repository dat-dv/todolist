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
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center text-sm text-gray-400 text-center sm:text-left">
        <span>© {currentYear} Đoàn Văn Đạt</span>
        <span>
          Contact:
          <a
            href="mailto:datdoan.dev@gmail.com"
            className="px-1 hover:text-primary"
          >
            datdoan.dev@gmail.com
          </a>
          |
          <a
            href="https://github.com/dat-dv"
            target="_blank"
            rel="noopener noreferrer"
            className="pl-1 hover:text-primary"
          >
            GitHub
          </a>
        </span>
      </div>
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
