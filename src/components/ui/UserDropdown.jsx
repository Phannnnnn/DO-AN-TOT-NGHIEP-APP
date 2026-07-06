import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, User, LogOut } from "lucide-react";
import { useAuth } from "@/context/ContextProvider";

const UserDropdown = ({ handleLogout }) => {
 const [dropdownOpen, setDropdownOpen] = useState(false);
 const dropdownRef = useRef(null);

 const { user } = useAuth();

 useEffect(() => {
 const handleClickOutside = (event) => {
 if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
 setDropdownOpen(false);
 }
 };

 if (dropdownOpen) {
 document.addEventListener("mousedown", handleClickOutside);
 }
 return () => {
 document.removeEventListener("mousedown", handleClickOutside);
 };
 }, [dropdownOpen]);

 const getInitials = (name) => {
  if (!name) return "U";
  const parts = name.trim().split(" ");
  return (parts[0]?.[0] ?? "").toUpperCase() +
   (parts[parts.length - 1]?.[0] ?? "").toUpperCase();
 };

 return (
 <div className="relative" ref={dropdownRef}>
 <button
 onClick={() => setDropdownOpen((p) => !p)}
 aria-expanded={dropdownOpen}
 aria-haspopup="menu"
 className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded-full pr-2"
 >
 {user.avatar ? (
 <img
 src={user.avatar}
 alt="Avatar"
 className="w-8 h-8 rounded-full object-cover shadow-inner border border-white/10"
 onError={(e) => {
 e.target.style.display = "none";
 e.target.nextSibling.style.display = "flex";
 }}
 />
 ) : null}
 <div
 className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shadow-inner border border-white/10 shrink-0"
 style={{ display: user.avatar ? "none" : "flex" }}
 >
 {getInitials(user?.fullName)}
 </div>
 <span className="max-w-[120px] truncate">
 {user?.fullName || "Người dùng"}
 </span>
 <ChevronDown
 size={14}
 className={`text-slate-400 transition-transform duration-300 ${
 dropdownOpen ? "rotate-180 text-slate-900" : ""
 }`}
 />
 </button>

 {/* Menu Dropdown */}
 <div
 role="menu"
 className={`absolute right-0 top-full mt-2 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 py-1.5 w-48 z-50 origin-top-right transition-all duration-200 ease-out ${
 dropdownOpen
 ? "opacity-100 scale-100 translate-y-0 visible"
 : "opacity-0 scale-95 -translate-y-2 invisible pointer-events-none"
 }`}
 >
 {/* Header (Optional) - Có thể hiển thị lại tên hoặc email */}
 <div className="px-4 py-2 mb-1 border-b border-gray-50">
 <p className="text-sm text-gray-900 font-semibold truncate">
 {user?.fullName}
 </p>
 </div>

 <Link
 to="/profile"
 role="menuitem"
 onClick={() => setDropdownOpen(false)}
 className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors mx-1 rounded-md"
 >
 <User size={15} className="text-gray-400 group-hover:text-blue-600" />
 Tài khoản của tôi
 </Link>

 <div className="h-px bg-gray-100 my-1 mx-2" />

 <button
 onClick={(e) => {
 setDropdownOpen(false);
 handleLogout(e);
 }}
 role="menuitem"
 className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors mx-1 rounded-md cursor-pointer"
 >
 <LogOut size={15} className="text-red-500" />
 Đăng xuất
 </button>
 </div>
 </div>
 );
};

export default UserDropdown;
