import React from "react";
import { User, Mail, Phone, FileText } from "lucide-react";
import InputField from "./InputField";

const StepInfo = ({ form, setForm, errors }) => (
 <div className="flex flex-col gap-4">
 <InputField
 label="Họ và tên *"
 icon={<User size={15} />}
 placeholder="Nguyễn Văn A"
 value={form.guestName}
 onChange={(e) => setForm((p) => ({ ...p, guestName: e.target.value }))}
 error={errors.guestName}
 />
 <InputField
 label="Email *"
 icon={<Mail size={15} />}
 type="email"
 placeholder="example@email.com"
 value={form.guestEmail}
 onChange={(e) => setForm((p) => ({ ...p, guestEmail: e.target.value }))}
 error={errors.guestEmail}
 />
 <InputField
 label="Số điện thoại"
 icon={<Phone size={15} />}
 placeholder="0901 234 567"
 value={form.guestPhone}
 onChange={(e) => setForm((p) => ({ ...p, guestPhone: e.target.value }))}
 />
 <div className="flex flex-col gap-1.5">
 <label className="text-xs font-bold text-slate-400">
 Ghi chú
 </label>
 <div className="flex items-start gap-2.5 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus-within:border-[var(--blue)] focus-within:ring-1 focus-within:ring-[var(--blue)] transition-colors">
 <FileText size={15} className="text-[var(--blue)] shrink-0 mt-0.5" />
 <textarea
 rows={3}
 placeholder="Yêu cầu đặc biệt, giờ nhận phòng dự kiến..."
 value={form.notes}
 onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
 className="flex-1 text-sm text-slate-800 outline-none bg-transparent resize-none placeholder:text-slate-400"
 />
 </div>
 </div>
 </div>
);

export default StepInfo;
