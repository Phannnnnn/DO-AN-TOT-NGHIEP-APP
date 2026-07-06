import { Minus, Plus } from "lucide-react";
import { useState, useEffect } from "react";

const Stepper = ({ label, value, onChange, min = 1, max = 100, error }) => {
 const [inputVal, setInputVal] = useState(String(value));

 useEffect(() => {
 setInputVal(String(value));
 }, [value]);

 const handleInputChange = (e) => {
 const val = e.target.value;
 setInputVal(val);

 const parsed = parseInt(val, 10);
 if (!isNaN(parsed) && parsed >= min && parsed <= max) {
 onChange(parsed);
 }
 };

 const handleBlur = () => {
 const parsed = parseInt(inputVal, 10);

 if (!isNaN(parsed) && parsed >= min && parsed <= max) {
 onChange(parsed);
 setInputVal(String(parsed));
 } else {
 const fallback = Math.max(min, Math.min(max, value));
 onChange(fallback);
 setInputVal(String(fallback));
 }
 };

 const handleKeyDown = (e) => {
 if (e.key === "Enter") e.target.blur();
 };

 const decrement = () => {
 const next = Math.max(min, value - 1);
 onChange(next);
 setInputVal(String(next));
 };

 const increment = () => {
 const next = Math.min(max, value + 1);
 onChange(next);
 setInputVal(String(next));
 };

 return (
 <div className="flex flex-col gap-1.5 w-full">
 {label && (
 <label className="text-xs font-bold text-slate-400">
 {label}
 </label>
 )}
 <div className="flex items-center h-11 rounded-xl border border-slate-200 bg-white focus-within:border-[var(--blue)] focus-within:ring-1 focus-within:ring-[var(--blue)] overflow-hidden transition-all">
 {/* Decrement */}
 <button
 type="button"
 onClick={decrement}
 disabled={value <= min}
 className={`w-11 h-full flex items-center justify-center border-r border-slate-100 transition-colors shrink-0 cursor-pointer
 ${
 value <= min
 ? "text-slate-300 cursor-not-allowed bg-slate-50"
 : "text-slate-600 hover:bg-slate-50"
 }`}
 >
 <Minus size={14} />
 </button>

 {/* Input */}
 <input
 type="number"
 value={inputVal}
 onChange={handleInputChange}
 onBlur={handleBlur}
 onKeyDown={handleKeyDown}
 className="flex-1 h-full w-full text-center text-sm font-semibold text-slate-800 bg-transparent outline-none border-none focus:outline-none focus:ring-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
 />

 {/* Increment */}
 <button
 type="button"
 onClick={increment}
 disabled={value >= max}
 className={`w-11 h-full flex items-center justify-center border-l border-slate-100 transition-colors shrink-0 cursor-pointer
 ${
 value >= max
 ? "text-slate-300 cursor-not-allowed bg-slate-50"
 : "text-slate-600 hover:bg-slate-50"
 }`}
 >
 <Plus size={14} />
 </button>
 </div>

 {error && (
 <span className="text-xs text-red-500 font-medium mt-0.5">{error}</span>
 )}
 </div>
 );
};

export default Stepper;
