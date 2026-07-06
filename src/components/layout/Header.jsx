import { useLocation, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { LogOut, User, Menu, X } from "lucide-react";
import { useAuth } from "@/context/ContextProvider";
import NavLink from "../common/NavLink";
import UserDropdown from "../ui/UserDropDown";
import logoImg from "../../assets/img/logo.svg";

const NAV_ITEMS = [
 { label: "Trang chủ", path: "/" },
 { label: "Giới thiệu", path: "/about" },
];

const Header = () => {
 const location = useLocation();
 const navigate = useNavigate();
 const { user, logout } = useAuth();
 const [scrolled, setScrolled] = useState(false);
 const [menuOpen, setMenuOpen] = useState(false);
 const dropdownRef = useRef(null);

 useEffect(() => {
 const onScroll = () => setScrolled(window.scrollY > 40);
 window.addEventListener("scroll", onScroll);
 return () => window.removeEventListener("scroll", onScroll);
 }, []);

 const isActive = (path) => location.pathname === path;

 const handleLogout = () => {
 logout();
 navigate("/");
 };

 return (
 <header
 className={`w-full fixed top-0 z-50 transition-all duration-300 border-b ${
 scrolled
 ? "bg-white shadow-sm border-slate-100 py-3"
 : "bg-white/80 backdrop-blur-md border-transparent py-4"
 }`}
 >
 <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-6">
 <Link
 to="/"
 className="flex items-center gap-2.5 shrink-0"
 onClick={() => setMenuOpen(false)}
 >
 <img
 className="h-10 w-10 bg-transparent object-center object-contain"
 src={logoImg}
 alt="logo-img"
 />
 <span className="text-xl font-bold text-purple-900 tracking-wider">
 LUMISTAY
 </span>
 </Link>

 {/* Desktop Nav */}
 <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
 {NAV_ITEMS.map((item) => (
 <NavLink
 key={item.path}
 path={item.path}
 isActive={isActive(item.path)}
 label={item.label}
 />
 ))}
 </nav>

 {/* Desktop User / Auth */}
 <div className="hidden md:flex items-center shrink-0" ref={dropdownRef}>
 {user ? (
 <UserDropdown handleLogout={handleLogout} />
 ) : (
 <div className="flex gap-2">
 <NavLink path={"/auth/login"} label={"Đăng nhập"} />
 <NavLink path={"/auth/register"} label={"Đăng ký"} />
 </div>
 )}
 </div>

 {/* Mobile menu trigger */}
 <button
 onClick={() => setMenuOpen(!menuOpen)}
 className="flex lg:hidden items-center justify-center p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition duration-200 cursor-pointer shrink-0"
 >
 {menuOpen ? <X size={24} /> : <Menu size={24} />}
 </button>
 </div>

 {/* Mobile navigation overlay / drawer */}
 {menuOpen && (
 <div className="lg:hidden fixed inset-x-0 top-[68px] bottom-0 bg-white/95 backdrop-blur-lg z-40 flex flex-col p-6 animate-fade-in border-t border-slate-100">
 <nav className="flex flex-col gap-4 mb-8">
 {NAV_ITEMS.map((item) => (
 <Link
 key={item.path}
 to={item.path}
 onClick={() => setMenuOpen(false)}
 className={`text-lg font-bold px-4 py-3 rounded-xl transition duration-200 ${
 isActive(item.path)
 ? "bg-purple-50 text-purple-600"
 : "text-slate-600 hover:bg-slate-50"
 }`}
 >
 {item.label}
 </Link>
 ))}
 </nav>

 <div className="border-t border-slate-100 pt-6 mt-auto">
 {user ? (
 <div className="flex flex-col gap-4">
 <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-2xl">
 <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
 {user.fullName?.charAt(0).toUpperCase()}
 </div>
 <div>
 <p className="font-semibold text-slate-800 text-sm">
 {user.fullName}
 </p>
 <p className="text-xs text-slate-400">{user.email}</p>
 </div>
 </div>
 <Link
 to="/profile"
 onClick={() => setMenuOpen(false)}
 className="flex items-center gap-2 justify-center w-full h-11 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition"
 >
 <User size={16} /> Hồ sơ cá nhân
 </Link>
 <button
 onClick={() => {
 handleLogout();
 setMenuOpen(false);
 }}
 className="flex items-center gap-2 justify-center w-full h-11 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition font-bold text-sm cursor-pointer"
 >
 <LogOut size={16} /> Đăng xuất
 </button>
 </div>
 ) : (
 <div className="flex flex-col gap-3">
 <Link
 to="/auth/login"
 onClick={() => setMenuOpen(false)}
 className="flex items-center justify-center w-full h-11 rounded-xl bg-purple-600 text-white font-bold text-sm hover:bg-purple-700 transition"
 >
 Đăng nhập
 </Link>
 <Link
 to="/auth/register"
 onClick={() => setMenuOpen(false)}
 className="flex items-center justify-center w-full h-11 rounded-xl border border-purple-200 text-purple-600 font-bold text-sm hover:bg-purple-50 transition"
 >
 Đăng ký
 </Link>
 </div>
 )}
 </div>
 </div>
 )}
 </header>
 );
};

export default Header;
