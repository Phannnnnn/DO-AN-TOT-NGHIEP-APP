import { Link } from "react-router-dom";
import { Mail, Send, MapPin, Phone, Star } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0a1628] text-white">
      {/* ── Main grid ── */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Cột 1: Thương hiệu */}
        <div className="flex flex-col gap-5">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 w-fit">
            <div className="w-9 h-9 rounded-xl bg-[var(--blue)] flex items-center justify-center shadow-lg shadow-[var(--blue)]/30">
              <span className="text-[#0a1628] font-black text-lg leading-none">
                V
              </span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white font-black text-base tracking-wider uppercase">
                Victoria
              </span>
              <span className="text-[var(--blue)] text-[9px] font-bold tracking-[0.25em] uppercase">
                Heritage Hotel
              </span>
            </div>
          </Link>

          <p className="text-white/50 text-sm leading-relaxed">
            Tọa lạc tại trung tâm Sài Gòn, Victoria Heritage Hotel là điểm giao
            thoa giữa kiến trúc Đông Dương cổ điển và tiện nghi 5 sao hiện đại.
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  className="fill-[var(--blue)] text-[var(--blue)]"
                />
              ))}
            </div>
            <span className="text-white/40 text-xs">4.9 · 1.240 đánh giá</span>
          </div>
        </div>

        {/* Cột 2: Liên kết nhanh */}
        <div className="flex flex-col gap-5">
          <h3 className="text-xs font-black uppercase tracking-[0.25em] text-[var(--blue)]">
            Liên kết nhanh
          </h3>
          <ul className="flex flex-col gap-3">
            {[
              { label: "Trang chủ", path: "/" },
              { label: "Phòng & Giá", path: "/search" },
              { label: "Dịch vụ & Tiện ích", path: "/services" },
              { label: "Giới thiệu", path: "/about" },
              { label: "Liên hệ", path: "/contact" },
            ].map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="text-sm text-white/50 hover:text-[var(--blue)] transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-4 h-px bg-white/20 group-hover:bg-[var(--blue)] group-hover:w-6 transition-all duration-200" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Cột 3: Liên hệ */}
        <div className="flex flex-col gap-5">
          <h3 className="text-xs font-black uppercase tracking-[0.25em] text-[var(--blue)]">
            Liên hệ
          </h3>
          <ul className="flex flex-col gap-4">
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--blue)]/10 flex items-center justify-center shrink-0">
                <MapPin size={14} className="text-[var(--blue)]" />
              </div>
              <span className="text-sm text-white/50 leading-relaxed pt-1">
                123 Đường Heritage, Quận 1,
                <br />
                TP. Hồ Chí Minh
              </span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--blue)]/10 flex items-center justify-center shrink-0">
                <Phone size={14} className="text-[var(--blue)]" />
              </div>
              <a
                href="tel:+842838228888"
                className="text-sm text-white/50 hover:text-[var(--blue)] transition-colors"
              >
                +84 28 3822 8888
              </a>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--blue)]/10 flex items-center justify-center shrink-0">
                <Mail size={14} className="text-[var(--blue)]" />
              </div>
              <a
                href="mailto:info@victoriaheritage.com"
                className="text-sm text-white/50 hover:text-[var(--blue)] transition-colors"
              >
                info@victoriaheritage.com
              </a>
            </li>
          </ul>

          {/* Giờ làm việc */}
          <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-[var(--blue)] mb-2">
              Lễ tân 24/7
            </p>
            <p className="text-xs text-white/40">
              Luôn sẵn sàng phục vụ mọi lúc
            </p>
          </div>
        </div>

        {/* Cột 4: Nhận tin */}
        <div className="flex flex-col gap-5">
          <h3 className="text-xs font-black uppercase tracking-[0.25em] text-[var(--blue)]">
            Nhận ưu đãi
          </h3>
          <p className="text-sm text-white/50 leading-relaxed">
            Đăng ký để nhận thông báo ưu đãi độc quyền và tin tức mới nhất từ
            Victoria.
          </p>
          <div className="flex flex-col gap-2">
            <div className="relative">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder:text-white/30 outline-none focus:border-[var(--blue)]/50 transition-colors"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[var(--blue)] hover:bg-[#d97706] rounded-lg flex items-center justify-center text-[#0a1628] transition-all cursor-pointer hover:scale-105">
                <Send size={14} />
              </button>
            </div>
            <p className="text-[10px] text-white/25">
              Chúng tôi không gửi thư rác. Hủy đăng ký bất cứ lúc nào.
            </p>
          </div>

          {/* Chứng nhận */}
          <div className="flex gap-2 flex-wrap">
            {["5 Sao Quốc tế", "TripAdvisor 2024", "Best Hotel SG"].map(
              (badge) => (
                <span
                  key={badge}
                  className="text-[10px] font-bold text-white/40 border border-white/10 px-2.5 py-1 rounded-full"
                >
                  {badge}
                </span>
              ),
            )}
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="border-t border-white/10" />

      {/* ── Copyright ── */}
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-[11px] text-white/25 uppercase tracking-widest">
          © 2026 Victoria Heritage Hotel. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          {["Chính sách bảo mật", "Điều khoản sử dụng", "Sơ đồ trang"].map(
            (item) => (
              <a
                key={item}
                href="#"
                className="text-[11px] text-white/25 hover:text-white/60 uppercase tracking-widest transition-colors"
              >
                {item}
              </a>
            ),
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
