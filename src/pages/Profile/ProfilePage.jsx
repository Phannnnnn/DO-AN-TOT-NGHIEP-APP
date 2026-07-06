import { useAuth, useNotification } from "@/context/ContextProvider";
import {
  userService,
  cloudinaryService,
  bookingService,
  hotelService,
} from "@/services";
import { authService } from "@/services/auth/authService";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import ProfileSidebar from "./ProfileSidebar";
import PersonalInfoTab from "./PersonalInfoTab";
import ChangePasswordTab from "./ChangePasswordTab";
import BookingHistoryTab from "./BookingHistoryTab";
import AddServiceModal from "./AddServiceModal";

const ProfilePage = () => {
  const { user, loading: authLoading, logout, updateUser } = useAuth();
  const toast = useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(
    () => location.state?.tab || "info",
  );
  const [userProfile, setUserProfile] = useState(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [availableServices, setAvailableServices] = useState([]);

  const [showServiceModal, setShowServiceModal] = useState(false);
  const [selectedDetailId, setSelectedDetailId] = useState(null);
  const [selectedRoomNumber, setSelectedRoomNumber] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [serviceQuantity, setServiceQuantity] = useState(1);
  const [addingService, setAddingService] = useState(false);

  const fetchBookings = async () => {
    try {
      setBookingsLoading(true);
      const res = await bookingService.myBookings();
      if (res.success && res.data) {
        setBookings(res.data);
      }
    } catch (error) {
      toast.error("Lỗi", "Không thể tải lịch sử đặt phòng.");
      console.error(error);
    } finally {
      setBookingsLoading(false);
    }
  };

  const fetchAvailableServices = async () => {
    try {
      const res = await hotelService.getServices();
      if (res.success && res.data) {
        setAvailableServices(res.data.filter((service) => service.isActive));
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách dịch vụ:", error);
    }
  };

  useEffect(() => {
    if (activeTab === "bookings") {
      fetchBookings();
      fetchAvailableServices();
    }
  }, [activeTab]);

  const openAddServiceModal = (detailId, roomNumber) => {
    setSelectedDetailId(detailId);
    setSelectedRoomNumber(roomNumber);
    setSelectedServiceId(availableServices[0]?.serviceId || "");
    setServiceQuantity(1);
    setShowServiceModal(true);
  };

  const handleAddServiceSubmit = async (e) => {
    e.preventDefault();
    if (!selectedServiceId) {
      toast.error("Lỗi", "Vui lòng chọn một dịch vụ.");
      return;
    }

    setAddingService(true);
    try {
      const res = await bookingService.addService(selectedDetailId, {
        serviceId: Number(selectedServiceId),
        quantity: serviceQuantity,
      });

      if (res.success || res.data) {
        toast.success("Thành công", "Đã thêm dịch vụ thành công!");
        setShowServiceModal(false);
        fetchBookings(); // Tải lại danh sách để cập nhật
      }
    } catch (error) {
      toast.error(
        "Lỗi",
        error?.response?.data?.message ||
          error?.message ||
          "Không thể thêm dịch vụ.",
      );
      console.error(error);
    } finally {
      setAddingService(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    const confirmCancel = window.confirm(
      "Bạn có chắc chắn muốn hủy đơn đặt phòng này không? Hành động này không thể hoàn tác.",
    );
    if (!confirmCancel) return;

    try {
      const res = await bookingService.cancelBooking(bookingId);
      if (res.success || res.data) {
        toast.success("Thành công", "Hủy đơn đặt phòng thành công!");
        fetchBookings();
      }
    } catch (error) {
      toast.error(
        "Lỗi",
        error?.response?.data?.message ||
          error?.message ||
          "Không thể hủy đơn đặt phòng.",
      );
      console.error(error);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Lỗi", "Kích thước ảnh tối đa là 5MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Lỗi", "Vui lòng chọn tệp ảnh hợp lệ");
      return;
    }

    setUploadingAvatar(true);
    try {
      const signRes = await cloudinaryService.generateSignature("avatars");
      if (!signRes.success) {
        throw new Error("Không thể tạo chữ ký tải ảnh");
      }

      const { signature, timestamp, apiKey, cloudName, folder } = signRes.data;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("folder", folder);

      const uploadRes = await cloudinaryService.upload(cloudName, formData);
      const data = await uploadRes.json();

      const secureUrl = data?.secure_url;
      if (!secureUrl) {
        throw new Error("Không nhận được URL ảnh từ Cloudinary");
      }

      const customerId = userProfile?.customer?.customerId;
      if (!customerId) {
        throw new Error("Không tìm thấy thông tin khách hàng tương ứng");
      }

      const saveRes = await userService.updateCustomer(customerId, {
        avatar: secureUrl,
      });

      if (saveRes.success) {
        toast.success("Thành công", "Cập nhật ảnh đại diện thành công!");

        // Làm mới JWT để avatar mới được lưu vào token
        // → tránh mất avatar khi reload trang
        try {
          const storedRefresh = localStorage.getItem("refresh_token");
          if (storedRefresh) {
            const refreshRes = await authService.refreshToken(storedRefresh);
            if (refreshRes.success && refreshRes.data?.access_token) {
              localStorage.setItem(
                "access_token",
                refreshRes.data.access_token,
              );
              if (refreshRes.data.refresh_token) {
                localStorage.setItem(
                  "refresh_token",
                  refreshRes.data.refresh_token,
                );
              }
              // Decode token mới để lấy avatar đã cập nhật
              const decoded = jwtDecode(refreshRes.data.access_token);
              updateUser({ avatar: decoded.avatar ?? secureUrl });
            } else {
              // Fallback: cập nhật state trực tiếp nếu refresh lỗi
              updateUser({ avatar: secureUrl });
            }
          } else {
            updateUser({ avatar: secureUrl });
          }
        } catch {
          // Nếu refresh thất bại vẫn cập nhật UI
          updateUser({ avatar: secureUrl });
        }

        setUserProfile((prev) => ({
          ...prev,
          customer: {
            ...prev.customer,
            avatar: secureUrl,
          },
        }));
      }
    } catch (err) {
      console.error(err);
      toast.error(
        "Lỗi",
        err?.response?.data?.error?.message ||
          err?.message ||
          "Tải ảnh lên không thành công. Vui lòng thử lại.",
      );
    } finally {
      setUploadingAvatar(false);
    }
  };

  // Forms State
  const [infoForm, setInfoForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    nationality: "Việt Nam",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Loading states for actions
  const [savingInfo, setSavingInfo] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  // Form errors
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!authLoading && !user) {
      toast.info("Thông báo", "Vui lòng đăng nhập để xem thông tin cá nhân.");
      navigate("/auth/login");
    }
  }, [user, authLoading, navigate]);

  const fetchUserProfile = async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const res = await userService.getUserById(user.id);
      if (res.success && res.data) {
        setUserProfile(res.data);
        const customer = res.data.customer || {};

        // Format dateOfBirth to yyyy-MM-dd for HTML input
        let dob = "";
        if (customer.dateOfBirth) {
          dob = customer.dateOfBirth.split("T")[0];
        }

        setInfoForm({
          fullName: customer.fullName || "",
          email: customer.email || "",
          phone: customer.phone || "",
          dateOfBirth: dob,
          address: customer.address || "",
          nationality: customer.nationality || "Việt Nam",
        });
      }
    } catch (error) {
      toast.error("Lỗi", "Không thể tải thông tin tài khoản.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchUserProfile();
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    toast.success("Thành công", "Đăng xuất thành công.");
    navigate("/");
  };

  // Validation
  const validateInfo = () => {
    const errs = {};
    if (!infoForm.fullName.trim()) {
      errs.fullName = "Họ và tên không được để trống";
    }
    if (infoForm.phone.trim() && !/^[0-9]{9,11}$/.test(infoForm.phone.trim())) {
      errs.phone = "Số điện thoại không hợp lệ (9 - 11 chữ số)";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validatePassword = () => {
    const errs = {};
    if (!passwordForm.currentPassword) {
      errs.currentPassword = "Vui lòng nhập mật khẩu hiện tại";
    }
    if (!passwordForm.newPassword) {
      errs.newPassword = "Vui lòng nhập mật khẩu mới";
    } else if (passwordForm.newPassword.length < 6) {
      errs.newPassword = "Mật khẩu mới phải từ 6 ký tự trở lên";
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errs.confirmPassword = "Mật khẩu xác nhận không khớp";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Submit Handlers
  const handleSaveInfo = async (e) => {
    e.preventDefault();
    if (!validateInfo()) return;

    setSavingInfo(true);
    try {
      const customerId = userProfile?.customer?.customerId;
      if (!customerId) {
        toast.error("Lỗi", "Không tìm thấy thông tin khách hàng tương ứng.");
        return;
      }

      const updateData = {
        fullName: infoForm.fullName.trim(),
        phone: infoForm.phone.trim() || null,
        address: infoForm.address.trim() || null,
        nationality: infoForm.nationality.trim() || "Việt Nam",
        dateOfBirth: infoForm.dateOfBirth || null,
      };

      const res = await userService.updateCustomer(customerId, updateData);
      if (res.success) {
        toast.success("Thành công", "Cập nhật thông tin cá nhân thành công!");

        // Làm mới JWT để fullName mới được lưu vào token
        // → tránh lệch fullName ở header/dropdown
        try {
          const storedRefresh = localStorage.getItem("refresh_token");
          if (storedRefresh) {
            const refreshRes = await authService.refreshToken(storedRefresh);
            if (refreshRes.success && refreshRes.data?.access_token) {
              localStorage.setItem(
                "access_token",
                refreshRes.data.access_token,
              );
              if (refreshRes.data.refresh_token) {
                localStorage.setItem(
                  "refresh_token",
                  refreshRes.data.refresh_token,
                );
              }
              const decoded = jwtDecode(refreshRes.data.access_token);
              updateUser({ fullName: decoded.fullName });
            } else {
              updateUser({ fullName: updateData.fullName });
            }
          } else {
            updateUser({ fullName: updateData.fullName });
          }
        } catch {
          updateUser({ fullName: updateData.fullName });
        }

        fetchUserProfile();
      }
    } catch (error) {
      toast.error(
        "Lỗi",
        error?.response?.data?.message ||
          error?.message ||
          "Cập nhật thất bại. Vui lòng thử lại.",
      );
    } finally {
      setSavingInfo(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;

    setSavingPassword(true);
    try {
      const res = await userService.changePassword(user.id, {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      if (res.success || res.message) {
        toast.success("Thành công", res.message || "Đổi mật khẩu thành công!");
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setErrors({});
      }
    } catch (error) {
      toast.error(
        "Lỗi",
        error?.response?.data?.message ||
          error?.message ||
          "Đổi mật khẩu thất bại.",
      );
    } finally {
      setSavingPassword(false);
    }
  };

  if (authLoading || (loading && !userProfile)) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-20">
        <div className="flex flex-col items-center gap-3 text-[var(--green)] font-semibold">
          <Loader2 size={36} className="animate-spin text-[var(--blue)]" />
          <p className="text-sm">Đang tải thông tin tài khoản...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-28 pb-16">
      {/* Decorative Blur Elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-[var(--blue)]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Title */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">
            Quản lý tài khoản
          </h1>
          <p className="text-[var(--green)] font-semibold text-sm mt-1">
            Quản lý thông tin cá nhân của bạn
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* LEFT COLUMN: Sidebar Profile Card */}
          <ProfileSidebar
            user={user}
            userProfile={userProfile}
            uploadingAvatar={uploadingAvatar}
            handleAvatarChange={handleAvatarChange}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            handleLogout={handleLogout}
            setErrors={setErrors}
          />

          {/* RIGHT COLUMN: Tab Panel Form */}
          <div className="lg:col-span-3">
            {/* PERSONAL INFO TAB */}
            {activeTab === "info" && (
              <PersonalInfoTab
                infoForm={infoForm}
                setInfoForm={setInfoForm}
                errors={errors}
                savingInfo={savingInfo}
                handleSaveInfo={handleSaveInfo}
              />
            )}

            {/* CHANGE PASSWORD TAB */}
            {activeTab === "password" && (
              <ChangePasswordTab
                passwordForm={passwordForm}
                setPasswordForm={setPasswordForm}
                errors={errors}
                savingPassword={savingPassword}
                handleChangePassword={handleChangePassword}
              />
            )}

            {/* BOOKINGS TAB */}
            {activeTab === "bookings" && (
              <BookingHistoryTab
                bookings={bookings}
                bookingsLoading={bookingsLoading}
                navigate={navigate}
                handleCancelBooking={handleCancelBooking}
                openAddServiceModal={openAddServiceModal}
              />
            )}
          </div>
        </div>
      </div>

      {/* ADD SERVICE MODAL */}
      <AddServiceModal
        showServiceModal={showServiceModal}
        setShowServiceModal={setShowServiceModal}
        selectedRoomNumber={selectedRoomNumber}
        selectedServiceId={selectedServiceId}
        setSelectedServiceId={setSelectedServiceId}
        availableServices={availableServices}
        serviceQuantity={serviceQuantity}
        setServiceQuantity={setServiceQuantity}
        addingService={addingService}
        handleAddServiceSubmit={handleAddServiceSubmit}
      />
    </div>
  );
};

export default ProfilePage;
