import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mx-12 flex flex-col sm:flex-row justify-between items-center gap-4 py-4 border-t">
      <p className="text-sm text-gray-400 text-center sm:text-left">
        © {currentYear} TodoList. All rights reserved.
      </p>
      <div className="flex gap-6">
        <Link
          to="/"
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          Home
        </Link>
        <Link
          to="/register"
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          Register
        </Link>
        <Link
          to="/login"
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          Login
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
