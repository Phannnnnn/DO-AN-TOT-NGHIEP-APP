import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home, BedDouble } from "lucide-react";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a1628] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(ellipse, rgba(245,158,11,0.4) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(ellipse, rgba(245,158,11,0.3) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Dot pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04]"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="dots"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.5" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      <div className="relative z-10 text-center max-w-lg w-full">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl bg-[var(--blue)]/10 border border-[var(--blue)]/20 flex items-center justify-center">
              <BedDouble size={40} className="text-[var(--blue)]" />
            </div>
            {/* Glow ring */}
            <div
              className="absolute inset-0 rounded-3xl animate-ping opacity-20 bg-[var(--blue)]"
              style={{ animationDuration: "2.5s" }}
            />
          </div>
        </div>

        {/* 404 */}
        <div className="mb-6">
          <h1
            className="font-black uppercase leading-none mb-2"
            style={{
              fontSize: "clamp(6rem, 20vw, 10rem)",
              letterSpacing: "-0.05em",
              background:
                "linear-gradient(135deg, var(--blue) 0%, var(--blue) 50%, rgba(245,158,11,0.3) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            404
          </h1>
          <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[var(--blue)]/60 to-transparent" />
        </div>

        {/* Text */}
        <h2 className="text-white font-black text-2xl uppercase tracking-wide mb-3">
          Trang không tồn tại
        </h2>
        <p className="text-white/40 text-sm leading-relaxed mb-10 max-w-sm mx-auto">
          Trang bạn đang tìm kiếm đã bị xóa hoặc không tồn tại. Vui lòng quay
          lại trang chủ để tiếp tục.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/15 text-white/60 hover:text-white hover:border-white/30 text-sm font-semibold transition-all cursor-pointer"
          >
            <ArrowLeft size={16} /> Quay lại
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest text-[#0a1628] transition-all hover:-translate-y-0.5 cursor-pointer"
            style={{
              background: "linear-gradient(135deg, var(--blue), var(--blue))",
              boxShadow: "0 4px 20px rgba(245,158,11,0.3)",
            }}
          >
            <Home size={16} /> Về trang chủ
          </button>
        </div>

        {/* Logo nhỏ dưới cùng */}
        <div className="mt-14 flex items-center justify-center gap-2 opacity-30">
          <div className="w-6 h-6 rounded-lg bg-[var(--blue)] flex items-center justify-center">
            <span className="text-[#0a1628] font-black text-xs">V</span>
          </div>
          <span className="text-white text-xs font-black uppercase tracking-widest">
            Victoria Heritage Hotel
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
