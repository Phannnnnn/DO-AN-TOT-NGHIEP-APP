import { Mail, Send, MapPin, Phone, Angry } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[var(--black_bg)] pt-16 pb-8 px-8 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Cột 1: Thông tin thương hiệu */}
        <div className="space-y-6">
          <h2 className="text-xl font-serif font-bold tracking-widest uppercase border-b border-[var(--white)]/20 pb-2 inline-block">
            Victoria
          </h2>
          <p className="text-[var(--white)]/60 text-sm leading-relaxed">
            Khởi nguồn từ niềm đam mê với di sản và sự tận tâm, chúng tôi cam
            kết mang đến cho bạn những kỳ nghỉ dưỡng tuyệt nhất.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="p-2 hover:bg-[var(--orange)] rounded-full transition duration-300"
            >
              <Angry size={18} />
            </a>
            <a
              href="#"
              className="p-2 hover:bg-[var(--orange)] rounded-full transition duration-300"
            >
              <Angry size={18} />
            </a>
            <a
              href="#"
              className="p-2 hover:bg-[var(--orange)] rounded-full transition duration-300"
            >
              <Angry size={18} />
            </a>
          </div>
        </div>

        {/* Cột 2: Liên kết nhanh */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--orange)]">
            Liên kết nhanh
          </h3>
          <ul className="space-y-4 text-sm text-[var(--white)]/60">
            <li>
              <a href="#" className="hover:text-[var(--whtie)] transition">
                Về chúng tôi
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[var(--whtie)] transition">
                Phòng & Giá
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[var(--whtie)] transition">
                Dịch vụ & Tiện ích
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[var(--whtie)] transition">
                Tin tức & Sự kiện
              </a>
            </li>
          </ul>
        </div>

        {/* Cột 3: Thông tin liên hệ */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--orange)]">
            Liên hệ
          </h3>
          <ul className="space-y-4 text-sm text-[var(--white)]/60">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-[var(--orange)] shrink-0" />
              <span>123 Đường Heritage, Quận 1, TP. Hồ Chí Minh</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-[var(--orange)] shrink-0" />
              <span>+84 28 3822 8888</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-[var(--orange)] shrink-0" />
              <span>info@victoriaheritage.com</span>
            </li>
          </ul>
        </div>

        {/* Cột 4: Đăng ký nhận tin */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--orange)]">
            Bản tin
          </h3>
          <p className="text-sm text-[var(--white)]/30">
            Nhận những ưu đãi đặc biệt mới nhất.
          </p>
          <div className="relative">
            <input
              type="email"
              placeholder="Email của bạn"
              className="w-full border border-[var(--white)]/10 rounded-sm py-3 px-4 text-sm outline-none focus:border-[var(--orange)] transition"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-[var(--orange)]/60 text-[var(--white)]/60 hover:text-[var(--white)] hover:bg-[var(--orange)] rounded-sm transition duration-300 cursor-pointer">
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Dòng Copyright cuối trang */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-[var(--white)]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-[var(--white)]/30 uppercase tracking-widest">
        <p>© 2026 Victoria.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[var(--white)] transition">
            Chính sách bảo mật
          </a>
          <a href="#" className="hover:text-[var(--white)] transition">
            Điều khoản sử dụng
          </a>
          <a href="#" className="hover:text-[var(--white)] transition">
            Sơ đồ trang
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
