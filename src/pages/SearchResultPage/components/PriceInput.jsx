import { X } from "lucide-react";

const PriceInput = ({ value, onChange, placeholder }) => {
  // Hiển thị giá trị đã format (dấu . phân cách nghìn)
  const displayValue = value ? Number(value).toLocaleString("vi-VN") : "";

  const handleChange = (e) => {
    // Chỉ giữ lại chữ số
    const raw = e.target.value.replace(/\D/g, "");
    onChange(raw);
  };

  const isEmpty = !value;

  return (
    <div
      className={`group flex items-center gap-2 h-10 px-3 rounded-xl border-2 bg-white transition-all ${
        isEmpty
          ? "border-slate-200 hover:border-purple-200"
          : "border-[var(--blue)] bg-purple-50/40"
      } focus-within:border-[var(--blue)] focus-within:bg-purple-50/40`}
    >
      {/* Icon tiền tệ */}
      <span
        className={`text-xs font-bold shrink-0 transition-colors ${
          isEmpty ? "text-slate-300" : "text-[var(--blue)]"
        } group-focus-within:text-[var(--blue)]`}
      >
        ₫
      </span>

      {/* Input thực */}
      <input
        type="text"
        inputMode="numeric"
        value={displayValue}
        placeholder={placeholder}
        onChange={handleChange}
        className="flex-1 min-w-0 bg-transparent text-xs font-bold text-slate-700 placeholder:text-slate-300 outline-none"
      />

      {/* Suffix đơn vị */}
      {!isEmpty && (
        <span className="text-xs font-semibold text-slate-400 shrink-0">đ</span>
      )}

      {/* Nút xóa */}
      {!isEmpty && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="w-4 h-4 rounded-full bg-slate-200 hover:bg-red-100 hover:text-red-500 flex items-center justify-center transition-all cursor-pointer shrink-0"
        >
          <X size={9} />
        </button>
      )}
    </div>
  );
};

export default PriceInput;
