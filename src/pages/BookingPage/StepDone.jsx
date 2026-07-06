import React from "react";
import { Check } from "lucide-react";
import { formatVND } from "./utils";

const StepDone = ({ bookingResult }) => (
 <div className="text-center py-8 flex flex-col items-center gap-4">
 <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
 <Check size={32} className="text-green-500" />
 </div>
 <div>
 <h3 className="text-xl font-bold text-slate-800">
 Đặt phòng thành công!
 </h3>
 <p className="text-sm text-slate-500 mt-1">
 Mã đặt phòng:{" "}
 <span className="font-bold text-slate-800">
 #{bookingResult?.bookingId}
 </span>
 </p>
 </div>
 <p className="text-sm text-slate-500 max-w-xs text-center">
 Xác nhận đã được gửi đến email. Vui lòng kiểm tra hộp thư.
 </p>
 <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 w-full text-sm">
 <div className="flex justify-between mb-2">
 <span className="text-slate-500">Tổng thanh toán</span>
 <span className="font-bold text-slate-800">
 {formatVND(bookingResult?.totalAmount ?? 0)}
 </span>
 </div>
 <div className="flex justify-between">
 <span className="text-slate-500">Phương thức</span>
 <span className="font-semibold text-slate-800">VNPAY</span>
 </div>
 </div>
 </div>
);

export default StepDone;
