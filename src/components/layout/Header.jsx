import { useLocation } from "react-router-dom";
import { NavItem } from "../common/NavItem";

const Header = () => {
  const location = useLocation();

  const navItem = [{ label: "Trang chủ", path: "/" }];

  const isAcctive = (path) => location.pathname === path;

  return (
    <header className="absolute top-0 w-full z-50 flex items-center justify-between px-16 py-6 bg-[var(--blue)]/10 backdrop-blur-sm border-b border-[var(--white)]/20">
      <div className="flex justify-center items-center gap-4">
        <h1 className="text-xl font-serif font-bold tracking-widest uppercase">
          Victoria
        </h1>
        logo
      </div>
      <nav className="hidden md:flex gap-8">
        {navItem.map((item, index) => {
          return (
            <NavItem
              key={index}
              isAcctive={isAcctive(item.path)}
              direct={item.path}
              label={item.label}
            />
          );
        })}
      </nav>
      <button className="bg-[var(--blue_dark)]/80 text-[var(--white)]/80 hover:bg-[var(--blue_dark)] hover:text-[var(--white)] px-8 py-2 rounded-sm font-semibold text-sm hover:bg-navy-900 transition cursor-pointer">
        Đặt ngay
      </button>
    </header>
  );
};

export default Header;
