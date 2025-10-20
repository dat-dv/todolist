import { Bounce, ToastContainer } from "react-toastify";

export const CustomToastContainer = () => (
  <ToastContainer
    position="top-right"
    autoClose={10000}
    hideProgressBar
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnFocusLoss={false}
    draggable
    pauseOnHover={false}
    theme="colored"
    transition={Bounce}
  />
);
