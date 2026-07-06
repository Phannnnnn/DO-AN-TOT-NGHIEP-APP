import { CheckCircle2, XCircle, AlertCircle, Info } from "lucide-react";
import CancelButton from "./CancelButton";
import { useNoScroll } from "@/hooks/useNoScroll";

export const DialogType = {
 SUCCESS: "success",
 ERROR: "error",
 WARNING: "warning",
 INFO: "info",
};

const TYPE_CONFIGS = {
 success: {
 icon: CheckCircle2,
 iconColor: "text-emerald-600",
 iconBg: "bg-emerald-50 border-emerald-100",
 glowColor: "bg-emerald-500",
 topBarGradient: "from-emerald-500 to-teal-400",
 buttonGradient:
 "from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 shadow-[0_4px_16px_rgba(16,185,129,0.2)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.3)]",
 typeLabel: "Thành công",
 typeLabelColor: "text-emerald-600",
 },
 error: {
 icon: XCircle,
 iconColor: "text-red-600",
 iconBg: "bg-red-50 border-red-100",
 glowColor: "bg-red-500",
 topBarGradient: "from-red-500 to-rose-400",
 buttonGradient:
 "from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 shadow-[0_4px_16px_rgba(239,68,68,0.2)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.3)]",
 typeLabel: "Thất bại / Lỗi",
 typeLabelColor: "text-red-600",
 },
 warning: {
 icon: AlertCircle,
 iconColor: "text-amber-600",
 iconBg: "bg-amber-50 border-amber-100",
 glowColor: "bg-amber-500",
 topBarGradient: "from-amber-500 to-yellow-400",
 buttonGradient:
 "from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 shadow-[0_4px_16px_rgba(245,158,11,0.2)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.3)]",
 typeLabel: "Cảnh báo",
 typeLabelColor: "text-amber-600",
 },
 info: {
 icon: Info,
 iconColor: "text-purple-600",
 iconBg: "bg-purple-50 border-purple-100",
 glowColor: "bg-purple-500",
 topBarGradient: "from-[#7c3aed] to-[#4f46e5]",
 buttonGradient:
 "from-[#7c3aed] to-[#4f46e5] hover:from-[#6d28d9] hover:to-[#4338ca] shadow-[0_4px_16px_rgba(124,58,237,0.2)] hover:shadow-[0_6px_20px_rgba(124,58,237,0.3)]",
 typeLabel: "Thông báo",
 typeLabelColor: "text-purple-600",
 },
};

const NotificationDialog = ({
 isOpen,
 onClose,
 type = "info",
 title = "Thông báo",
 description = "",
 confirmLabel = "Xác nhận",
 onConfirm,
}) => {
 useNoScroll(isOpen);
 if (!isOpen) return null;

 const cfg = TYPE_CONFIGS[type] ?? TYPE_CONFIGS.info;
 const IconComponent = cfg.icon;

 const handleConfirm = () => {
 if (onConfirm) {
 onConfirm();
 }
 onClose();
 };

 return (
 <div
 className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[4px] animate-fade-in"
 onClick={(e) => {
 if (e.target === e.currentTarget) onClose();
 }}
 >
 <div className="relative w-full max-w-sm rounded-2xl border border-slate-100 shadow-[0_24px_48px_rgba(0,0,0,0.08),0_0_32px_rgba(124,58,237,0.04)] bg-white/95 backdrop-blur-md overflow-hidden">
 {/* Top accent */}
 <div
 className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${cfg.topBarGradient}`}
 />

 {/* Glow blob */}
 <div
 className={`absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full pointer-events-none ${cfg.glowColor} blur-[60px] opacity-[0.06]`}
 />

 <div className="absolute top-4 right-4 z-10">
 <CancelButton onClose={onClose} />
 </div>

 <div className="relative p-8 flex flex-col items-center gap-5">
 {/* Icon */}
 <div
 className={`w-16 h-16 rounded-2xl flex items-center justify-center border ${cfg.iconBg}`}
 >
 <IconComponent size={28} className={cfg.iconColor} />
 </div>

 {/* Text */}
 <div className="flex flex-col items-center text-center gap-2">
 <p
 className={`text-xs font-bold ${cfg.typeLabelColor}`}
 >
 {cfg.typeLabel}
 </p>
 <h3 className="text-xl font-bold text-slate-800">
 {title}
 </h3>
 {description && (
 <p className="text-xs text-slate-500 leading-relaxed max-w-[260px]">
 {description}
 </p>
 )}
 </div>

 {/* Action button */}
 <button
 onClick={handleConfirm}
 className={`w-full h-11 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 bg-gradient-to-r ${cfg.buttonGradient} transition-all cursor-pointer`}
 >
 {confirmLabel}
 </button>
 </div>
 </div>
 </div>
 );
};

export default NotificationDialog;
