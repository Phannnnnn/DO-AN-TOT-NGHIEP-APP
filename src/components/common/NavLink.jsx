import { Link } from "react-router-dom";

const NavLink = ({ path, isActive, label }) => {
 return (
 <Link
 to={path}
 className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
 isActive
 ? "text-[var(--blue)] bg-[var(--blue)]/10"
 : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
 }`}
 >
 {label}
 </Link>
 );
};

export default NavLink;
