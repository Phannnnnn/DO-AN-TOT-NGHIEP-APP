import { Link } from "react-router-dom";
import logoImg from "../../assets/img/logo.svg";
import { Mail, Send, MapPin, Phone } from "lucide-react";

const Footer = () => {
 return (
 <footer className="bg-slate-50 text-slate-800 border-t border-slate-200/80">
 {/* ── Main grid ── */}
 <div className="max-w-7xl mx-auto px-6 pt-16 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
 {/* Cột 1: Thương hiệu */}
 <div className="flex flex-col gap-5">
 {/* Logo */}
 <Link to="/" className="flex items-center gap-2.5 w-fit">
 <img
 className="h-10 w-10 bg-transparent object-center object-contain"
 src={logoImg}
 alt="logo-img"
 />
 <span className="text-xl font-bold text-purple-900 tracking-wider">
 LUMISTAY
 </span>
 </Link>

 <p className="text-slate-500 text-sm leading-relaxed">
 Tọa lạc tại trung tâm thủ đô, LUMISTAY ở HÀ NỘI là điểm giao
 thoa giữa kiến trúc hiện đại và dịch vụ lưu trú đẳng cấp, mang lại trải nghiệm tuyệt vời cho quý khách.
 </p>
 </div>

 {/* Cột 2: Liên kết nhanh */}
 <div className="flex flex-col gap-5">
 <h3 className="text-xs font-bold text-[var(--blue)]">
 Liên kết nhanh
 </h3>
 <ul className="flex flex-col gap-3">
 {[
 { label: "Trang chủ", path: "/" },
 { label: "Giới thiệu", path: "/about" },
 ].map((item) => (
 <li key={item.path}>
 <Link
 to={item.path}
 className="text-sm text-slate-500 hover:text-[var(--blue)] transition-colors duration-200 flex items-center gap-2 group"
 >
 <span className="w-4 h-px bg-slate-300 group-hover:bg-[var(--blue)] group-hover:w-6 transition-all duration-200" />
 {item.label}
 </Link>
 </li>
 ))}
 </ul>
 </div>

 {/* Cột 3: Liên hệ */}
 <div className="flex flex-col gap-5">
 <h3 className="text-xs font-bold text-[var(--blue)]">
 Liên hệ
 </h3>
 <ul className="flex flex-col gap-4">
 <li className="flex items-start gap-3">
 <div className="w-8 h-8 rounded-lg bg-[var(--blue)]/10 flex items-center justify-center shrink-0">
 <MapPin size={14} className="text-[var(--blue)]" />
 </div>
 <span className="text-sm text-slate-500 leading-relaxed pt-1">
 Số 123 Đường Cầu Giấy, Quận Cầu Giấy,
 <br />
 TP. Hà Nội
 </span>
 </li>
 <li className="flex items-center gap-3">
 <div className="w-8 h-8 rounded-lg bg-[var(--blue)]/10 flex items-center justify-center shrink-0">
 <Phone size={14} className="text-[var(--blue)]" />
 </div>
 <a
 href="tel:0326227573"
 className="text-sm text-slate-500 hover:text-[var(--blue)] transition-colors"
 >
 0326 227 573
 </a>
 </li>
 <li className="flex items-center gap-3">
 <div className="w-8 h-8 rounded-lg bg-[var(--blue)]/10 flex items-center justify-center shrink-0">
 <Mail size={14} className="text-[var(--blue)]" />
 </div>
 <a
 href="mailto:qlks.kltn.vnua@gmail.com"
 className="text-sm text-slate-500 hover:text-[var(--blue)] transition-colors"
 >
 qlks.kltn.vnua@gmail.com
 </a>
 </li>
 </ul>

 {/* Giờ làm việc */}
 <div className="bg-slate-100/60 border border-slate-200/60 rounded-xl px-4 py-3">
 <p className="text-xs font-bold text-[var(--blue)] mb-2">
 Lễ tân 24/7
 </p>
 <p className="text-xs text-slate-500">
 Luôn sẵn sàng phục vụ mọi lúc
 </p>
 </div>
 </div>

 {/* Cột 4: Nhận tin */}
 <div className="flex flex-col gap-5">
 <h3 className="text-xs font-bold text-[var(--blue)]">
 Nhận ưu đãi
 </h3>
 <p className="text-sm text-slate-500 leading-relaxed">
 Đăng ký để nhận thông báo ưu đãi độc quyền và tin tức mới nhất từ
 LUMISTAY.
 </p>
 <div className="flex flex-col gap-2">
 <div className="relative">
 <input
 type="email"
 placeholder="Nhập email của bạn"
 className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-4 pr-12 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[var(--blue)] transition-colors"
 />
 <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[var(--blue)] hover:bg-violet-700 rounded-lg flex items-center justify-center text-white transition-all cursor-pointer hover:scale-105">
 <Send size={14} />
 </button>
 </div>
 <p className="text-xs text-slate-400">
 Chúng tôi không gửi thư rác. Hủy đăng ký bất cứ lúc nào.
 </p>
 </div>
 </div>
 </div>

 {/* ── Divider ── */}
 <div className="border-t border-slate-200/80" />

 {/* ── Copyright ── */}
 <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
 <p className="text-xs text-slate-400">
 © 2026 LUMISTAY.
 </p>
 <div className="flex items-center gap-5">
 {["Chính sách bảo mật", "Điều khoản sử dụng"].map((item) => (
 <a
 key={item}
 href="#"
 className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
 >
 {item}
 </a>
 ))}
 </div>
 </div>
 </footer>
 );
};

export default Footer;
