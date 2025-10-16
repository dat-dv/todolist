import type { NavigateOptions } from 'react-router-dom';

import { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function useRouter() {
  const navigate = useNavigate();
  const location = useLocation();

  const router = useMemo(
    () => ({
      back: () => navigate(-1),
      forward: () => navigate(1),
      refresh: () => navigate(0),
      push: (href: string, options?: NavigateOptions) => {
        // Save current page as previous before navigating
        if (location.pathname !== href) {
          sessionStorage.setItem('previousPage', location.pathname);
        }
        navigate(href, options);
      },
      replace: (href: string) => {
        // Save current page as previous before navigating
        if (location.pathname !== href) {
          sessionStorage.setItem('previousPage', location.pathname);
        }
        navigate(href, { replace: true });
      },
    }),
    [navigate, location.pathname]
  );

  return router;
}
