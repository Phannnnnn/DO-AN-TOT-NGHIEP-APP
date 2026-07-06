import AuthLeftPanel from "@/components/layout/AuthLeftPanel";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
 return (
 <div className="flex h-screen w-screen overflow-hidden bg-slate-50 text-slate-800 font-sans antialiased">
 <div className="hidden lg:block lg:w-[50%] h-full shrink-0">
 <AuthLeftPanel />
 </div>

 <main className="flex flex-1 flex-col items-center justify-center p-4 sm:p-8 md:p-12 h-full bg-slate-50 relative overflow-hidden">
 <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-30 bg-purple-200 blur-[100px] pointer-events-none" />

 <div className="w-full max-w-md max-h-full z-10 animate-in fade-in zoom-in-95 duration-300">
 <Outlet />
 </div>
 </main>
 </div>
 );
};

export default AuthLayout;
