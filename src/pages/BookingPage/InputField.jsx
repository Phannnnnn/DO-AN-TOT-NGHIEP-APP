import React from "react";

const InputField = ({ label, icon, error, ...props }) => (
 <div className="flex flex-col gap-1.5">
 <label className="text-xs font-bold text-slate-400">
 {label}
 </label>
 <div
 className={`flex items-center gap-2.5 h-11 px-3.5 rounded-xl border transition-colors ${
 error
 ? "border-red-500 bg-red-50/20"
 : "border-slate-200 bg-white focus-within:border-[var(--blue)] focus-within:ring-1 focus-within:ring-[var(--blue)]"
 }`}
 >
 <span className="text-[var(--blue)] shrink-0">{icon}</span>
 <input
 className="flex-1 text-sm text-slate-800 outline-none bg-transparent placeholder:text-slate-400"
 {...props}
 />
 </div>
 {error && <p className="text-xs text-red-500">{error}</p>}
 </div>
);

export default InputField;
