import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

/**
 * CustomSelect (Dropdown) for KLTN-APP
 */
const CustomSelect = ({ label, value, onChange, options, placeholder = "Chọn..." }) => {
 const [open, setOpen] = useState(false);
 const dropdownRef = useRef(null);

 const selected = options.find((o) => o.value === value);

 // Close dropdown on click outside
 useEffect(() => {
 const handleOutsideClick = (event) => {
 if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
 setOpen(false);
 }
 };
 if (open) {
 document.addEventListener("mousedown", handleOutsideClick);
 }
 return () => {
 document.removeEventListener("mousedown", handleOutsideClick);
 };
 }, [open]);

 return (
 <div className="flex flex-col gap-1.5 w-full relative" ref={dropdownRef}>
 {label && (
 <label className="text-xs font-bold text-slate-400">
 {label}
 </label>
 )}

 {/* Trigger */}
 <button
 type="button"
 onClick={() => setOpen((prev) => !prev)}
 className={`w-full h-11 px-4 rounded-xl text-sm font-semibold flex items-center justify-between gap-2 transition-all cursor-pointer bg-white
 border ${
 open
 ? "border-[var(--blue)] ring-1 ring-[var(--blue)]"
 : "border-slate-200 hover:border-slate-300"
 } text-slate-800`}
 >
 <span className="truncate">
 {selected ? selected.label : placeholder}
 </span>
 <ChevronDown
 size={14}
 className={`text-slate-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180 text-slate-700" : ""}`}
 />
 </button>

 {/* Options Dropdown Menu */}
 {open && (
 <div className="absolute top-full left-0 w-full mt-1.5 rounded-xl border border-slate-100 bg-white shadow-2xl z-50 py-1.5 max-h-60 overflow-y-auto dropdown-scrollbar animate-in fade-in slide-in-from-top-1 duration-100">
 {options.length === 0 ? (
 <div className="px-4 py-2.5 text-xs text-slate-400 italic">Không có lựa chọn</div>
 ) : (
 options.map((opt) => {
 const isSelected = opt.value === value;
 return (
 <button
 key={opt.value}
 type="button"
 onClick={() => {
 onChange(opt.value);
 setOpen(false);
 }}
 className={`w-full px-4 py-2.5 text-sm text-left transition-colors cursor-pointer flex items-center justify-between
 ${
 isSelected
 ? "bg-[var(--blue)]/5 text-[var(--blue)] font-bold"
 : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
 }`}
 >
 <span className="truncate">{opt.label}</span>
 {isSelected && (
 <span className="w-1.5 h-1.5 rounded-full bg-[var(--blue)]" />
 )}
 </button>
 );
 })
 )}
 </div>
 )}
 </div>
 );
};

export default CustomSelect;
