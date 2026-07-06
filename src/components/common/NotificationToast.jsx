import { CheckCircle2, XCircle, AlertCircle, Info } from "lucide-react";
import CancelButton from "./CancelButton";

export const ToastType = {
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
    typeLabel: "Thành công",
    typeLabelColor: "text-emerald-600",
  },
  error: {
    icon: XCircle,
    iconColor: "text-red-600",
    iconBg: "bg-red-50 border-red-100",
    glowColor: "bg-red-500",
    topBarGradient: "from-red-500 to-rose-400",
    typeLabel: "Thất bại / Lỗi",
    typeLabelColor: "text-red-600",
  },
  warning: {
    icon: AlertCircle,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50 border-amber-100",
    glowColor: "bg-amber-500",
    topBarGradient: "from-amber-500 to-yellow-400",
    typeLabel: "Cảnh báo",
    typeLabelColor: "text-amber-600",
  },
  info: {
    icon: Info,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-50 border-purple-100",
    glowColor: "bg-purple-500",
    topBarGradient: "from-[#7c3aed] to-[#4f46e5]",
    typeLabel: "Thông báo",
    typeLabelColor: "text-purple-600",
  },
};

const NotificationToast = ({
  isOpen,
  onClose,
  type = "info",
  title = "Thông báo",
  description = "",
  isExiting = false,
}) => {
  if (!isOpen) return null;

  const cfg = TYPE_CONFIGS[type] ?? TYPE_CONFIGS.info;
  const IconComponent = cfg.icon;

  return (
    <div
      className={`relative w-full max-w-sm rounded-2xl border border-slate-100 shadow-[0_12px_40px_rgba(124,58,237,0.08),0_0_20px_rgba(0,0,0,0.03)] bg-white/95 backdrop-blur-md overflow-hidden pointer-events-auto ${
        isExiting ? "animate-toast-slide-out" : "animate-toast-slide-in"
      }`}
    >
      {/* Top accent */}
      <div
        className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${cfg.topBarGradient}`}
      />

      {/* Glow blob */}
      <div
        className={`absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full pointer-events-none ${cfg.glowColor} blur-[60px] opacity-[0.06]`}
      />

      <div className="absolute top-3 right-3 z-10">
        <CancelButton onClose={onClose} />
      </div>

      <div className="relative p-5 pr-10 flex items-start gap-4">
        {/* Icon */}
        <div
          className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center border ${cfg.iconBg}`}
        >
          <IconComponent size={20} className={cfg.iconColor} />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-1 min-w-0">
          <p className={`text-xs font-bold ${cfg.typeLabelColor}`}>{title}</p>
          {description && (
            <p className="text-xs text-slate-500 leading-normal">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationToast;
