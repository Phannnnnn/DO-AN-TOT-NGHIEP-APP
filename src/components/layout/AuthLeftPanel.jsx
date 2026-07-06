import { Hotel, Sparkles, CheckCircle2 } from "lucide-react";

const AuthLeftPanel = () => {
 return (
 <div className="relative hidden h-full w-full overflow-hidden bg-purple-950 lg:flex lg:flex-col">
 {/* Hình ảnh khách sạn tone màu sáng/hiện đại */}
 <img
 src="https://images.unsplash.com/photo-1551882547-ff40c0d5c9f4?auto=format&fit=crop&w=1200&q=80"
 alt="Modern Hotel Experience"
 className="absolute inset-0 h-full w-full object-cover opacity-40 scale-105 transition-transform duration-1000 mix-blend-overlay"
 />

 {/* Overlay gradient Tím tạo sự liền mạch */}
 <div className="absolute inset-0 bg-gradient-to-t from-purple-950 via-purple-900/80 to-purple-800/40" />

 {/* Nội dung chính bên trong Panel */}
 <div className="relative z-10 flex flex-col justify-between h-full px-16 py-12 text-white">
 {/* Top: Logo & Tên thương hiệu */}
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-inner">
 <Hotel className="text-purple-300 w-5 h-5" />
 </div>
 <div>
 <span className="text-lg font-bold block text-white">LUMISTAY</span>
 <span className="text-xs text-purple-300 font-semibold block -mt-1">
 Hotels & Resorts
 </span>
 </div>
 </div>

 {/* Middle: Lời chào và Thông điệp truyền cảm hứng */}
 <div className="max-w-md my-auto space-y-6">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 backdrop-blur-sm">
 <Sparkles className="w-4 h-4 text-purple-300" />
 <span className="text-xs text-purple-100 font-medium">
 Độc quyền cho thành viên
 </span>
 </div>

 <h1 className="text-4xl font-semibold leading-tight text-white">
 Trở lại với <br />
 <span className="font-bold text-purple-300">
 Kỳ nghỉ mơ ước
 </span>{" "}
 của bạn
 </h1>

 <p className="text-purple-100/80 text-base leading-relaxed font-light font-sans">
 Đăng nhập để tiếp tục hành trình khám phá những điểm đến tuyệt vời
 và nhận ngay ưu đãi giảm đến 15% cho lần đặt phòng kế tiếp.
 </p>

 {/* Các gạch đầu dòng quyền lợi */}
 <ul className="space-y-3 pt-4 border-t border-white/10">
 {[
 "Tích lũy điểm thưởng đổi đêm nghỉ miễn phí",
 "Hủy phòng linh hoạt không tính phí",
 "Hỗ trợ check-in sớm & nâng hạng phòng",
 ].map((text, idx) => (
 <li
 key={idx}
 className="flex items-center gap-3 text-sm text-purple-50"
 >
 <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
 <span>{text}</span>
 </li>
 ))}
 </ul>
 </div>

 {/* Bottom: Bản quyền / Chân trang tinh tế */}
 <div className="text-xs text-purple-200/60 flex justify-between items-center border-t border-white/10 pt-6">
 <span>© 2026 LUMISTAY</span>
 <span className="hover:text-white cursor-pointer transition-colors">
 Trợ giúp & Điều khoản
 </span>
 </div>
 </div>
 </div>
 );
};

export default AuthLeftPanel;
