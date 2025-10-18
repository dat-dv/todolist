import type { TSimpleLayoutProps } from "./simple-layout.type";
import UserMenu from "../../molecules/user-menu";
import Footer from "../../molecules/footer";

export const SimpleLayout: React.FC<TSimpleLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gray-100">
      <div className="fixed top-5 right-5 z-50">
        <UserMenu />
      </div>
      <div className="flex-1 w-full">
        <div className="sm:min-h-[90vh] min-h-[85vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
};
