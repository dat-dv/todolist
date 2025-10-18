import { useState, useEffect, useRef } from "react";
import useAuth from "../../../hooks/use-auth";

interface UserMenuProps {
  className?: string;
}

const UserMenu = ({ className = "" }: UserMenuProps) => {
  const { user, logOut } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const username = user?.username;
  const toggleMenu = () => setOpen(!open);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickLogout = () => {
    logOut?.();
  };

  if (!username) return null;

  return (
    <div className={`relative ${className}`} ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-lg">
          {username?.charAt(0).toUpperCase() || "U"}
        </div>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-md z-50">
          <div className="px-4 py-2 text-sm text-gray-700">
            👋 Hello, <strong>{username}</strong>
          </div>
          <div className="border-t border-gray-100"></div>
          <button
            onClick={handleClickLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
