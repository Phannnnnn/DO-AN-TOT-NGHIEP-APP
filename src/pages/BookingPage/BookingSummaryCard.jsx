import React from "react";
import { formatVND, fmtDate } from "./utils";

const BookingSummaryCard = ({
  bookingResult,
  secondsLeft,
  countdownDisplay,
  checkInDate,
  checkOutDate,
  nights,
  rooms,
  totalPrice,
}) => {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-20 bg-white border border-slate-100 rounded-2xl p-5 flex flex-col gap-4 shadow-lg">
        {/* Countdown */}
        {!bookingResult && (
          <div
            className={`flex items-center justify-between p-3 rounded-xl ${
              secondsLeft <= 120
                ? "bg-red-50 border border-red-100"
                : "bg-purple-50 border border-purple-100"
            }`}
          >
            <span
              className={`text-xs font-bold ${secondsLeft <= 120 ? "text-red-500" : "text-[var(--blue)]"}`}
            >
              {secondsLeft <= 120 ? "⚠ Sắp hết hạn!" : "Thời gian giữ phòng"}
            </span>
            <span
              className={`font-bold text-base ${secondsLeft <= 120 ? "text-red-500" : "text-[var(--blue)]"}`}
            >
              {countdownDisplay}
            </span>
          </div>
        )}

        <p className="text-xs font-bold text-slate-400">Chi tiết đặt phòng</p>

        <div className="flex flex-col gap-1.5 text-sm">
          {[
            { label: "Nhận phòng", val: fmtDate(checkInDate) },
            { label: "Trả phòng", val: fmtDate(checkOutDate) },
            { label: "Số đêm", val: nights },
          ].map((row) => (
            <div key={row.label} className="flex justify-between">
              <span className="text-slate-500">{row.label}</span>
              <span className="font-semibold text-slate-800 text-right">
                {row.val}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-100 pt-3 flex flex-col gap-1.5">
          {(rooms ?? []).map((r) => (
            <div key={r.roomId} className="flex justify-between text-sm">
              <span className="text-slate-500">{r.roomType?.typeName}</span>
              <span className="font-semibold text-slate-800">
                {formatVND(parseFloat(r.pricePlan?.basePrice ?? 0) * nights)}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-100 pt-3">
          <div className="flex justify-between">
            <span className="font-bold text-slate-800">Tổng cộng</span>
            <span className="font-bold text-lg text-slate-900">
              {formatVND(totalPrice)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummaryCard;
