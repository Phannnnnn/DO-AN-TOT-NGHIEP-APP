import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
 CalendarDays,
 ChevronDown,
 ChevronLeft,
 ChevronRight,
} from "lucide-react";

// ── Helpers ───────────────────────────────────────────────────────────────────

const MONTHS_VI = [
 "Tháng 1",
 "Tháng 2",
 "Tháng 3",
 "Tháng 4",
 "Tháng 5",
 "Tháng 6",
 "Tháng 7",
 "Tháng 8",
 "Tháng 9",
 "Tháng 10",
 "Tháng 11",
 "Tháng 12",
];
const DAYS_VI = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
const CALENDAR_HEIGHT = 300;

const toDateStr = (date) => {
 const Y = date.getFullYear();
 const M = String(date.getMonth() + 1).padStart(2, "0");
 const D = String(date.getDate()).padStart(2, "0");
 return `${Y}-${M}-${D}`;
};

const formatDisplay = (dateStr) =>
 new Date(dateStr + "T00:00:00").toLocaleDateString("vi-VN", {
 day: "2-digit",
 month: "2-digit",
 year: "numeric",
 });

// ── Calendar Popup ────────────────────────────────────────────────────────────

const CalendarPopup = ({
 value,
 minDate,
 maxDate,
 onSelect,
 rect,
 onClose,
}) => {
 const today = new Date();
 const init = value
 ? new Date(value + "T00:00:00")
 : minDate
 ? new Date(minDate + "T00:00:00")
 : today;

 const [viewYear, setViewYear] = useState(init.getFullYear());
 const [viewMonth, setViewMonth] = useState(init.getMonth());
 const [showMonthSelect, setShowMonthSelect] = useState(false);
 const [showYearSelect, setShowYearSelect] = useState(false);

 const containerRef = useRef(null);

 useEffect(() => {
 const handleClickOutside = (e) => {
 if (containerRef.current && !containerRef.current.contains(e.target)) {
 setShowMonthSelect(false);
 setShowYearSelect(false);
 }
 };
 document.addEventListener("mousedown", handleClickOutside);
 return () => document.removeEventListener("mousedown", handleClickOutside);
 }, []);

 const spaceBelow = window.innerHeight - rect.bottom;
 const showAbove = spaceBelow < CALENDAR_HEIGHT + 10;
 const top = showAbove ? rect.top - CALENDAR_HEIGHT - 6 : rect.bottom + 6;

 const prevMonth = () => {
 setShowMonthSelect(false);
 setShowYearSelect(false);
 if (viewMonth === 0) {
 setViewMonth(11);
 setViewYear((y) => y - 1);
 } else setViewMonth((m) => m - 1);
 };
 const nextMonth = () => {
 setShowMonthSelect(false);
 setShowYearSelect(false);
 if (viewMonth === 11) {
 setViewMonth(0);
 setViewYear((y) => y + 1);
 } else setViewMonth((m) => m + 1);
 };

 const firstDay = new Date(viewYear, viewMonth, 1).getDay();
 const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
 const cells = [];
 for (let i = 0; i < firstDay; i++) cells.push(null);
 for (let d = 1; d <= daysInMonth; d++) cells.push(d);

 // Generate Year options dynamically (last 100 years to 10 years in the future, constrained by minDate/maxDate)
 const currentYear = today.getFullYear();
 let startYear = currentYear - 100;
 let endYear = currentYear + 10;
 if (minDate) {
 const minD = new Date(minDate + "T00:00:00");
 if (!isNaN(minD.getTime())) {
 startYear = Math.max(startYear, minD.getFullYear());
 }
 }
 if (maxDate) {
 const maxD = new Date(maxDate + "T00:00:00");
 if (!isNaN(maxD.getTime())) {
 endYear = Math.min(endYear, maxD.getFullYear());
 }
 }
 const yearOptions = [];
 for (let y = endYear; y >= startYear; y--) {
 yearOptions.push(y);
 }

 return createPortal(
 <>
 <div className="fixed inset-0 z-[149]" onMouseDown={onClose} />
 <div
 ref={containerRef}
 className="fixed z-[150] rounded-2xl shadow-2xl p-4 w-[280px]"
 style={{
 top,
 left: Math.min(rect.left, window.innerWidth - 296),
 background: "#fff",
 border: "1px solid #e2e8f0",
 }}
 onMouseDown={(e) => e.stopPropagation()}
 >
 {/* Month nav */}
 <div className="flex items-center justify-between mb-3">
 <button
 type="button"
 onClick={prevMonth}
 className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
 >
 <ChevronLeft size={15} />
 </button>

 <div className="flex items-center gap-1.5 select-none">
 {/* Custom Month Dropdown */}
 <div className="relative">
 <button
 type="button"
 onClick={() => {
 setShowMonthSelect(!showMonthSelect);
 setShowYearSelect(false);
 }}
 className="text-xs font-bold text-gray-700 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 flex items-center gap-1 hover:bg-gray-100 hover:border-gray-300 transition-all cursor-pointer"
 >
 {MONTHS_VI[viewMonth]}
 <ChevronDown size={11} className={`text-gray-400 transition-transform duration-200 ${showMonthSelect ? "rotate-180" : ""}`} />
 </button>

 {showMonthSelect && (
 <div className="absolute top-full left-0 mt-1 w-28 bg-white border border-gray-100 rounded-xl shadow-xl z-[160] max-h-40 overflow-y-auto dropdown-scrollbar py-1">
 {MONTHS_VI.map((m, idx) => (
 <button
 key={idx}
 type="button"
 onClick={() => {
 setViewMonth(idx);
 setShowMonthSelect(false);
 }}
 className={`w-full text-left px-3 py-1.5 text-xs font-semibold hover:bg-gray-50 transition-colors cursor-pointer ${viewMonth === idx ? "text-[var(--blue)] bg-purple-50/50" : "text-gray-600"
 }`}
 >
 {m}
 </button>
 ))}
 </div>
 )}
 </div>

 {/* Custom Year Dropdown */}
 <div className="relative">
 <button
 type="button"
 onClick={() => {
 setShowYearSelect(!showYearSelect);
 setShowMonthSelect(false);
 }}
 className="text-xs font-bold text-gray-700 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 flex items-center gap-1 hover:bg-gray-100 hover:border-gray-300 transition-all cursor-pointer"
 >
 {viewYear}
 <ChevronDown size={11} className={`text-gray-400 transition-transform duration-200 ${showYearSelect ? "rotate-180" : ""}`} />
 </button>

 {showYearSelect && (
 <div className="absolute top-full right-0 mt-1 w-24 bg-white border border-gray-100 rounded-xl shadow-xl z-[160] max-h-40 overflow-y-auto dropdown-scrollbar py-1">
 {yearOptions.map((y) => (
 <button
 key={y}
 type="button"
 onClick={() => {
 setViewYear(y);
 setShowYearSelect(false);
 }}
 className={`w-full text-left px-3 py-1.5 text-xs font-semibold hover:bg-gray-50 transition-colors cursor-pointer ${viewYear === y ? "text-[var(--blue)] bg-purple-50/50" : "text-gray-600"
 }`}
 >
 {y}
 </button>
 ))}
 </div>
 )}
 </div>
 </div>

 <button
 type="button"
 onClick={nextMonth}
 className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
 >
 <ChevronRight size={15} />
 </button>
 </div>

 {/* Day headers */}
 <div className="grid grid-cols-7 mb-1">
 {DAYS_VI.map((d) => (
 <div
 key={d}
 className="text-center text-xs font-bold text-gray-400 py-1"
 >
 {d}
 </div>
 ))}
 </div>

 {/* Day cells */}
 <div className="grid grid-cols-7 gap-y-0.5">
 {cells.map((day, idx) => {
 if (!day) return <div key={`e-${idx}`} />;
 const dateStr = toDateStr(new Date(viewYear, viewMonth, day));
 const isSelected = value === dateStr;
 const isToday = toDateStr(today) === dateStr;
 const isDisabled =
 (minDate && dateStr < minDate) || (maxDate && dateStr > maxDate);

 return (
 <button
 key={dateStr}
 type="button"
 disabled={isDisabled}
 onClick={() => onSelect(dateStr)}
 className={`h-9 w-full rounded-xl text-xs font-semibold transition-all ${isSelected
 ? "bg-[var(--blue)] text-white shadow-md cursor-pointer"
 : isDisabled
 ? "text-gray-300 cursor-not-allowed"
 : isToday
 ? "text-[#0ea5e9] font-bold hover:bg-sky-50 cursor-pointer"
 : "text-gray-600 hover:bg-gray-100 cursor-pointer"
 }`}
 >
 {day}
 </button>
 );
 })}
 </div>
 </div>
 </>,
 document.body,
 );
};

// ── DateInput ─────────────────────────────────────────────────────────────────

const DateInput = ({
 label,
 value,
 onChange,
 minDate,
 maxDate,
 placeholder = "Chọn ngày",
 error,
 disabled = false,
 required = false,
 className = "",
}) => {
 const [open, setOpen] = useState(false);
 const [rect, setRect] = useState(null);
 const btnRef = useRef(null);

 const handleToggle = () => {
 if (disabled) return;
 if (!open && btnRef.current)
 setRect(btnRef.current.getBoundingClientRect());
 setOpen((v) => !v);
 };

 return (
 <div className="flex flex-col gap-1">
 {label && (
 <label className="text-xs font-bold text-gray-500">
 {label}
 {required && <span className="text-red-400 ml-0.5">*</span>}
 </label>
 )}

 <button
 ref={btnRef}
 type="button"
 onClick={handleToggle}
 disabled={disabled}
 className={`w-full h-11 px-3 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all bg-transparent text-left ${disabled
 ? "border-2 border-transparent opacity-40 cursor-not-allowed"
 : error
 ? "border-2 border-red-400 cursor-pointer"
 : open
 ? "border-2 border-[var(--blue)] cursor-pointer"
 : className || "border-2 border-transparent hover:border-gray-200 cursor-pointer"
 }`}
 >
 <CalendarDays
 size={15}
 className={
 value ? "text-[var(--blue)] shrink-0" : "text-gray-400 shrink-0"
 }
 />
 <span
 className={`flex-1 text-left truncate ${value ? "text-gray-800" : "text-gray-400"}`}
 >
 {value ? formatDisplay(value) : placeholder}
 </span>
 <ChevronDown
 size={13}
 className={`text-gray-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
 />
 </button>

 {error && <span className="text-xs text-red-400">{error}</span>}

 {open && rect && (
 <CalendarPopup
 value={value}
 minDate={minDate}
 maxDate={maxDate}
 onSelect={(date) => {
 onChange(date);
 setOpen(false);
 }}
 onClose={() => setOpen(false)}
 rect={rect}
 />
 )}
 </div>
 );
};

export default DateInput;
