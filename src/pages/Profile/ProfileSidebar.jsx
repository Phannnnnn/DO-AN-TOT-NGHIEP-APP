import React from "react";
import {
  Loader2,
  Camera,
  CheckCircle2,
  User,
  Lock,
  Calendar,
  LogOut,
} from "lucide-react";

const ProfileSidebar = ({
  user,
  userProfile,
  uploadingAvatar,
  handleAvatarChange,
  activeTab,
  setActiveTab,
  handleLogout,
  setErrors,
}) => {
  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (
      parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  };

  const getMemberSince = () => {
    if (!userProfile?.created_At) return "Mới";
    const date = new Date(userProfile.created_At);
    return date.toLocaleDateString("vi-VN", { year: "numeric", month: "long" });
  };

  return (
    <div className="lg:col-span-1 flex flex-col gap-6">
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-lg relative overflow-hidden group">
        <div className="flex flex-col items-center text-center mt-3">
          <div
            className="relative mb-4 group-hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() =>
              !uploadingAvatar &&
              document.getElementById("avatar-upload-input").click()
            }
          >
            <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center shadow-md border border-slate-100 bg-gradient-to-tr from-[var(--blue)] to-purple-600 relative">
              {userProfile?.customer?.avatar ? (
                <img
                  src={userProfile.customer.avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-white">
                  {getInitials(
                    userProfile?.customer?.fullName || user?.fullName,
                  )}
                </span>
              )}

              {uploadingAvatar && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <Loader2
                    size={20}
                    className="animate-spin text-[var(--blue)]"
                  />
                </div>
              )}
            </div>
            <div className="absolute bottom-0 right-0 bg-white text-[var(--blue)] p-1.5 rounded-full border border-slate-200 shadow-md">
              <Camera size={12} />
            </div>
            <input
              id="avatar-upload-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
              disabled={uploadingAvatar}
            />
          </div>

          <h3 className="font-bold text-lg text-slate-800 mb-1.5 line-clamp-1">
            {userProfile?.customer?.fullName || user?.fullName}
          </h3>

          <div className="h-px bg-slate-100 w-full my-5" />

          <div className="w-full flex flex-col gap-3 text-xs text-left">
            <div className="flex justify-between">
              <span className="text-[var(--black)]/60">Thành viên từ:</span>
              <span className="font-semibold">{getMemberSince()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--black)]/60">Trạng thái:</span>
              <span className="font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 size={12} /> Hoạt động
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-2.5 shadow-lg flex flex-col gap-1">
        <button
          onClick={() => {
            setActiveTab("info");
            setErrors({});
          }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
            activeTab === "info"
              ? "bg-[var(--blue)] text-white shadow-md shadow-purple-600/10"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
          }`}
        >
          <User size={16} />
          Thông tin cá nhân
        </button>

        <button
          onClick={() => {
            setActiveTab("password");
            setErrors({});
          }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
            activeTab === "password"
              ? "bg-[var(--blue)] text-white shadow-md shadow-purple-600/10"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
          }`}
        >
          <Lock size={16} />
          Đổi mật khẩu
        </button>

        <button
          onClick={() => {
            setActiveTab("bookings");
            setErrors({});
          }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
            activeTab === "bookings"
              ? "bg-[var(--blue)] text-white shadow-md shadow-purple-600/10"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
          }`}
        >
          <Calendar size={16} />
          Lịch sử đặt phòng
        </button>

        <div className="h-px bg-slate-100 my-2 mx-2" />

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer"
        >
          <LogOut size={16} />
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default ProfileSidebar;
