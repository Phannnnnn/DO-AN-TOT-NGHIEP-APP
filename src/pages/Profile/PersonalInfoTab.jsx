import React from "react";
import { User, Mail, Phone, Globe, MapPin, Loader2 } from "lucide-react";
import DateInput from "@/components/common/DatePickerCustom";

const PersonalInfoTab = ({
  infoForm,
  setInfoForm,
  errors,
  savingInfo,
  handleSaveInfo,
}) => {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 lg:p-8 shadow-lg">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-5 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[var(--blue)]/10 flex items-center justify-center border border-[var(--blue)]/20">
          <User className="text-[var(--blue)]" size={18} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800">
            Thông tin cá nhân
          </h2>
          <p className="text-[var(--green)] font-semibold text-xs mt-0.5">
            Cập nhật thông tin liên hệ và lý lịch của bạn
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSaveInfo}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Full Name */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-xs font-bold text-[var(--black)]/60">
            Họ và tên *
          </label>
          <div
            className={`flex items-center gap-2.5 h-11 px-3.5 rounded-xl border transition-colors bg-white ${
              errors.fullName
                ? "border-red-500"
                : "border-slate-200 focus-within:border-[var(--blue)] focus-within:ring-1 focus-within:ring-[var(--blue)]"
            }`}
          >
            <User size={16} className="text-[var(--blue)] shrink-0" />
            <input
              type="text"
              placeholder="Họ và tên"
              value={infoForm.fullName}
              onChange={(e) =>
                setInfoForm({ ...infoForm, fullName: e.target.value })
              }
              className="flex-1 text-sm text-slate-800 outline-none bg-transparent placeholder:text-[var(--black)]/60"
            />
          </div>
          {errors.fullName && (
            <p className="text-xs text-red-500">{errors.fullName}</p>
          )}
        </div>

        {/* Email (Read-only) */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[var(--black)]/60">
            Địa chỉ Email (Không thể thay đổi)
          </label>
          <div className="flex items-center gap-2.5 h-11 px-3.5 rounded-xl border border-slate-100 bg-slate-50 opacity-80">
            <Mail size={16} className="text-[var(--black)]/60 shrink-0" />
            <input
              type="email"
              disabled
              value={infoForm.email}
              className="flex-1 text-sm text-[var(--black)]/60 font-semibold outline-none bg-transparent cursor-not-allowed"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[var(--black)]/60">
            Số điện thoại
          </label>
          <div
            className={`flex items-center gap-2.5 h-11 px-3.5 rounded-xl border transition-colors bg-white ${
              errors.phone
                ? "border-red-500"
                : "border-slate-200 focus-within:border-[var(--blue)] focus-within:ring-1 focus-within:ring-[var(--blue)]"
            }`}
          >
            <Phone size={16} className="text-[var(--blue)] shrink-0" />
            <input
              type="tel"
              placeholder="Số điện thoại liên hệ"
              value={infoForm.phone}
              onChange={(e) =>
                setInfoForm({ ...infoForm, phone: e.target.value })
              }
              className="flex-1 text-sm text-slate-800 outline-none bg-transparent placeholder:text-[var(--black)]/60"
            />
          </div>
          {errors.phone && (
            <p className="text-xs text-red-500">{errors.phone}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[var(--black)]/60">
            Ngày sinh
          </label>
          <DateInput
            value={infoForm.dateOfBirth}
            onChange={(date) => setInfoForm({ ...infoForm, dateOfBirth: date })}
            placeholder="Chọn ngày sinh"
            className="border border-slate-200 hover:border-slate-300 focus:border-[var(--blue)] cursor-pointer"
          />
        </div>

        {/* Nationality */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[var(--black)]/60">
            Quốc tịch
          </label>
          <div className="flex items-center gap-2.5 h-11 px-3.5 rounded-xl border border-slate-200 focus-within:border-[var(--blue)] focus-within:ring-1 focus-within:ring-[var(--blue)] transition-colors bg-white">
            <Globe size={16} className="text-[var(--blue)] shrink-0" />
            <input
              type="text"
              placeholder="Quốc tịch"
              value={infoForm.nationality}
              onChange={(e) =>
                setInfoForm({ ...infoForm, nationality: e.target.value })
              }
              className="flex-1 text-sm text-slate-800 outline-none bg-transparent placeholder:text-[var(--black)]/60"
            />
          </div>
        </div>

        {/* Address */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-xs font-bold text-[var(--black)]/60">
            Địa chỉ thường trú
          </label>
          <div className="flex items-start gap-2.5 px-3.5 py-3 rounded-xl border border-slate-200 focus-within:border-[var(--blue)] focus-within:ring-1 focus-within:ring-[var(--blue)] transition-colors bg-white">
            <MapPin size={16} className="text-[var(--blue)] shrink-0 mt-0.5" />
            <textarea
              rows={3}
              placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố..."
              value={infoForm.address}
              onChange={(e) =>
                setInfoForm({ ...infoForm, address: e.target.value })
              }
              className="flex-1 text-sm text-slate-800 outline-none bg-transparent resize-none placeholder:text-[var(--black)]/60"
            />
          </div>
        </div>

        {/* Action button */}
        <div className="md:col-span-2 flex justify-end mt-4 pt-4 border-t border-slate-100">
          <button
            type="submit"
            disabled={savingInfo}
            className="h-11 px-8 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-purple-600/10"
          >
            {savingInfo ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Đang lưu...
              </>
            ) : (
              <>Lưu thay đổi</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoTab;
