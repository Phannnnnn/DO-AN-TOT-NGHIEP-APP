import React from "react";
import { BedDouble, Moon, Users } from "lucide-react";
import { fmtDate } from "./utils";

const StepConfirm = ({ form, booking }) => (
 <div className="flex flex-col gap-4">
 {/* Khách */}
 <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-5">
 <p className="text-xs font-bold text-slate-400 mb-3">
 Thông tin khách
 </p>
 <div className="flex flex-col gap-2 text-sm">
 {[
 { label: "Họ tên", val: form.guestName },
 { label: "Email", val: form.guestEmail },
 ...(form.guestPhone
 ? [{ label: "Điện thoại", val: form.guestPhone }]
 : []),
 ...(form.notes ? [{ label: "Ghi chú", val: form.notes }] : []),
 ].map((row) => (
 <div key={row.label} className="flex justify-between gap-4">
 <span className="text-slate-500 shrink-0">{row.label}</span>
 <span className="font-semibold text-slate-800 text-right">
 {row.val}
 </span>
 </div>
 ))}
 </div>
 </div>

 {/* Phòng */}
 <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-5">
 <p className="text-xs font-bold text-slate-400 mb-3">
 Phòng đặt
 </p>
 <div className="flex flex-col gap-3">
 {booking.rooms.map((r) => (
 <div
 key={r.roomId}
 className="flex items-center justify-between text-sm"
 >
 <div>
 <p className="font-semibold text-slate-800">
 {r.roomType?.typeName}
 </p>
 <p className="text-xs text-slate-500">
 Tầng {r.floor} · Phòng {r.roomNumber}
 </p>
 </div>
 <div className="flex gap-1.5 flex-wrap justify-end">
 {(r.roomBeds ?? []).map((b, i) => (
 <span
 key={i}
 className="text-xs text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded-full flex items-center gap-1"
 >
 <BedDouble size={10} className="text-[var(--blue)]" />{" "}
 {b.quantity}× {b.roomBedType}
 </span>
 ))}
 </div>
 </div>
 ))}
 </div>
 </div>

 {/* Lưu trú */}
 <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-5">
 <p className="text-xs font-bold text-slate-400 mb-3">
 Thông tin lưu trú
 </p>
 <div className="flex flex-col gap-2 text-sm">
 {[
 {
 icon: <Moon size={13} />,
 label: "Nhận phòng",
 val: fmtDate(booking.checkInDate),
 },
 {
 icon: <Moon size={13} />,
 label: "Trả phòng",
 val: fmtDate(booking.checkOutDate),
 },
 {
 icon: <Users size={13} />,
 label: "Khách",
 val: `${booking.adults} người lớn${Number(booking.children) > 0 ? `, ${booking.children} trẻ em` : ""}`,
 },
 ].map((row) => (
 <div key={row.label} className="flex justify-between">
 <span className="text-slate-500 flex items-center gap-1.5">
 <span className="text-[var(--blue)]">{row.icon}</span>
 {row.label}
 </span>
 <span className="font-semibold text-slate-800">{row.val}</span>
 </div>
 ))}
 </div>
 </div>
 </div>
);

export default StepConfirm;
