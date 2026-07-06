import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home, Compass } from "lucide-react";
import logoImg from "../../assets/img/logo.svg";

const NotFoundPage = () => {
 const navigate = useNavigate();

 return (
 <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-6 relative overflow-hidden">
 {/* Background radial glows for Light Theme */}
 <div className="absolute inset-0 pointer-events-none">
 <div
 className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-60 blur-[130px]"
 style={{
 background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, rgba(236,72,153,0.04) 50%, transparent 70%)",
 }}
 />
 <div
 className="absolute -bottom-10 left-10 w-96 h-96 rounded-full opacity-40 blur-[100px]"
 style={{
 background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
 }}
 />
 </div>

 {/* Subtle modern layout lines */}
 <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
 <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
 <defs>
 <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1" />
 </pattern>
 </defs>
 <rect width="100%" height="100%" fill="url(#grid)" />
 </svg>
 </div>

 <div className="relative z-10 text-center max-w-xl w-full flex flex-col items-center">
 {/* Animated Compass Icon with rotating ring (LUMISTAY style) */}
 <div className="relative mb-10 group">
 <div className="absolute inset-0 rounded-full bg-purple-500/10 blur-xl scale-125 transition-transform duration-500 group-hover:scale-150" />
 
 {/* Rotating dashed ring */}
 <div className="absolute -inset-4 rounded-full border border-dashed border-purple-500/30 animate-[spin_20s_linear_infinite]" />
 <div className="absolute -inset-8 rounded-full border border-dashed border-purple-500/10 animate-[spin_40s_linear_infinite_reverse]" />
 
 <div className="relative w-28 h-28 rounded-full bg-white border border-purple-100 flex items-center justify-center shadow-lg transition-colors group-hover:border-purple-200">
 <Compass size={44} className="text-[#7c3aed] transition-transform duration-500 group-hover:rotate-45" />
 </div>
 </div>

 {/* 404 Headline */}
 <div className="mb-6 relative">
 <h1
 className="font-bold leading-none tracking-tighter"
 style={{
 fontSize: "clamp(6.5rem, 18vw, 9.5rem)",
 background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #ec4899 100%)",
 WebkitBackgroundClip: "text",
 WebkitTextFillColor: "transparent",
 filter: "drop-shadow(0 4px 12px rgba(124,58,237,0.12))",
 }}
 >
 404
 </h1>
 <div className="h-[2px] w-36 mx-auto bg-gradient-to-r from-transparent via-[#7c3aed]/30 to-transparent my-4" />
 </div>

 {/* Informative Text */}
 <h2 className="text-slate-800 font-bold text-2xl md:text-3xl tracking-wider mb-4">
 Không tìm thấy trang
 </h2>
 <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-10 max-w-sm mx-auto font-medium">
 Đường dẫn bạn truy cập không tồn tại hoặc đã bị xóa. 
 Vui lòng quay lại hoặc trở về trang chủ để tiếp tục.
 </p>

 {/* Action Buttons */}
 <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
 <button
 onClick={() => navigate(-1)}
 className="flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-800 hover:bg-slate-100 hover:border-slate-350 text-sm font-semibold transition-all cursor-pointer duration-300"
 >
 <ArrowLeft size={16} /> Quay lại
 </button>
 
 <button
 onClick={() => navigate("/")}
 className="flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:-translate-y-0.5 cursor-pointer shadow-lg"
 style={{
 background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
 boxShadow: "0 6px 20px rgba(124,58,237,0.25)",
 }}
 onMouseEnter={(e) => {
 e.currentTarget.style.boxShadow = "0 8px 26px rgba(124,58,237,0.4)";
 }}
 onMouseLeave={(e) => {
 e.currentTarget.style.boxShadow = "0 6px 20px rgba(124,58,237,0.25)";
 }}
 >
 <Home size={16} /> Về trang chủ
 </button>
 </div>

 {/* Branding Footer */}
 <div className="mt-16 flex items-center justify-center gap-2.5 opacity-40 hover:opacity-60 transition-opacity duration-300">
 <img
 className="h-6 w-6 object-contain"
 src={logoImg}
 alt="LUMISTAY Logo"
 />
 <span className="text-slate-800 text-[11px] font-bold tracking-[0.2em]">
 LUMISTAY
 </span>
 </div>
 </div>
 </div>
 );
};

export default NotFoundPage;
