import { SWRConfig } from "swr";
import { Outlet } from "react-router";

import { AuthProvider } from "./contexts/auth/auth-provider";
import { CustomToastContainer } from "./components/atoms/custom-toast-container";

export default function App() {
  return (
    <SWRConfig
      value={{
        refreshInterval: 0,
        dedupingInterval: 5000,
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        shouldRetryOnError: false,
        revalidateOnMount: true,
        keepPreviousData: true,
      }}
    >
      <AuthProvider>
        <Outlet />
        <CustomToastContainer />
      </AuthProvider>
    </SWRConfig>
  );
}
