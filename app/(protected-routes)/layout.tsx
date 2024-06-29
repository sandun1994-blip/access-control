import MobileHeader from "@/components/mobile-header";
import Sidebar from "@/components/sidebar";
import { AuthProvider } from "@/lib/context/auth-provider";


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
    <MobileHeader/>
    <Sidebar className="hidden lg:flex"/>
      <main className=" lg:pl-[256px]  h-full pt-[50px] lg:pt-0">
        <div className="bg-white h-full  w-full flex flex-col gap-y-10 items-center justify-center">{children}</div>
      </main>
      </AuthProvider>
  );
};

export default DashboardLayout;
