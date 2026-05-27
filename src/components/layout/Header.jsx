import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Trang chủ", path: "/" },
  { label: "Phòng & Giá", path: "/search" },
  { label: "Dịch vụ", path: "/services" },
  { label: "Giới thiệu", path: "/about" },
  { label: "Liên hệ", path: "/contact" },
];

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--blue_dark)] shadow-xl py-3"
          : "bg-[var(--blue_dark)]/70 backdrop-blur-md py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
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

        {/* Nav desktop */}
        <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isActive(item.path)
                  ? "text-[var(--blue)] bg-[var(--blue)]/10"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Đăng nhập */}
        <div className="hidden md:flex items-center shrink-0">
          <button className="text-sm font-semibold text-white/70 hover:text-white transition-colors cursor-pointer">
            Đăng nhập
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen((p) => !p)}
          className="lg:hidden p-2 text-white rounded-lg hover:bg-white/10 transition"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#0a1628] border-t border-white/10 px-6 py-4 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={`px-4 py-3 rounded-xl text-sm font-semibold transition ${
                isActive(item.path)
                  ? "bg-[var(--blue)]/15 text-[var(--blue)]"
                  : "text-white/80 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/search"
            onClick={() => setMenuOpen(false)}
            className="mt-3 bg-[var(--blue)] text-[#0a1628] text-sm font-black py-3 rounded-xl text-center uppercase tracking-wide"
          >
            Đặt phòng ngay
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
