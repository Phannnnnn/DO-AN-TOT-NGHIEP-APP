import React, { useState } from "react";
import { Lock, KeyRound, Eye, EyeOff, Loader2 } from "lucide-react";

const ChangePasswordTab = ({
  passwordForm,
  setPasswordForm,
  errors,
  savingPassword,
  handleChangePassword,
}) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 lg:p-8 shadow-lg max-w-2xl">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-5 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[var(--blue)]/10 flex items-center justify-center border border-[var(--blue)]/20">
          <Lock className="text-[var(--blue)]" size={18} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800">Đổi mật khẩu</h2>
          <p className="text-[var(--green)] font-semibold text-xs mt-0.5">
            Để bảo vệ tài khoản, vui lòng không chia sẻ mật khẩu của bạn
          </p>
        </div>
      </div>

      <form onSubmit={handleChangePassword} className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[var(--black)]/60">
            Mật khẩu hiện tại *
          </label>
          <div
            className={`flex items-center gap-2.5 h-11 px-3.5 rounded-xl border transition-colors bg-white ${
              errors.currentPassword
                ? "border-red-500"
                : "border-slate-200 focus-within:border-[var(--blue)] focus-within:ring-1 focus-within:ring-[var(--blue)]"
            }`}
          >
            <Lock size={16} className="text-[var(--blue)] shrink-0" />
            <input
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu hiện tại"
              value={passwordForm.currentPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  currentPassword: e.target.value,
                })
              }
              className="flex-1 text-sm text-slate-800 outline-none bg-transparent placeholder:text-[var(--black)]/60"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword((prev) => !prev)}
              className="text-[var(--black)]/60 hover:text-slate-600 transition-colors cursor-pointer animate-fade-in"
            >
              {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="text-xs text-red-500">{errors.currentPassword}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[var(--black)]/60">
            Mật khẩu mới *
          </label>
          <div
            className={`flex items-center gap-2.5 h-11 px-3.5 rounded-xl border transition-colors bg-white ${
              errors.newPassword
                ? "border-red-500"
                : "border-slate-200 focus-within:border-[var(--blue)] focus-within:ring-1 focus-within:ring-[var(--blue)]"
            }`}
          >
            <KeyRound size={16} className="text-[var(--blue)] shrink-0" />
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="Mật khẩu tối thiểu 6 ký tự"
              value={passwordForm.newPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  newPassword: e.target.value,
                })
              }
              className="flex-1 text-sm text-slate-800 outline-none bg-transparent placeholder:text-[var(--black)]/60"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="text-[var(--black)]/60 hover:text-slate-600 transition-colors cursor-pointer animate-fade-in"
            >
              {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-xs text-red-500">{errors.newPassword}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[var(--black)]/60">
            Xác nhận mật khẩu mới *
          </label>
          <div
            className={`flex items-center gap-2.5 h-11 px-3.5 rounded-xl border transition-colors bg-white ${
              errors.confirmPassword
                ? "border-red-500"
                : "border-slate-200 focus-within:border-[var(--blue)] focus-within:ring-1 focus-within:ring-[var(--blue)]"
            }`}
          >
            <KeyRound size={16} className="text-[var(--blue)] shrink-0" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Nhập lại mật khẩu mới"
              value={passwordForm.confirmPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  confirmPassword: e.target.value,
                })
              }
              className="flex-1 text-sm text-slate-800 outline-none bg-transparent placeholder:text-[var(--black)]/60"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="text-[var(--black)]/60 hover:text-slate-600 transition-colors cursor-pointer animate-fade-in"
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-500">{errors.confirmPassword}</p>
          )}
        </div>

        <div className="flex justify-end mt-4 pt-4 border-t border-slate-100">
          <button
            type="submit"
            disabled={savingPassword}
            className="h-11 px-8 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-purple-600/10"
          >
            {savingPassword ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Đang cập nhật...
              </>
            ) : (
              <>Cập nhật mật khẩu</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordTab;
