import React from "react";
import { Loader2, Calendar, Plus } from "lucide-react";

const BookingHistoryTab = ({
  bookings,
  bookingsLoading,
  navigate,
  handleCancelBooking,
  openAddServiceModal,
}) => {
  const getBookingStatusBadge = (booking) => {
    const isOccupied =
      booking.status === "confirmed" &&
      booking.actualCheckIn &&
      !booking.actualCheckOut;

    if (isOccupied) {
      return "bg-emerald-50 text-emerald-600 border-emerald-100";
    }

    switch (booking.status) {
      case "pending":
        return "bg-amber-50 text-amber-600 border-amber-100";
      case "confirmed":
        return "bg-blue-50 text-blue-600 border-blue-100";
      case "completed":
        return "bg-purple-50 text-purple-600 border-purple-100";
      case "cancelled":
        return "bg-rose-50 text-rose-600 border-rose-100";
      default:
        return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  const getBookingStatusName = (booking) => {
    const isOccupied =
      booking.status === "confirmed" &&
      booking.actualCheckIn &&
      !booking.actualCheckOut;

    if (isOccupied) {
      return "Đang lưu trú";
    }

    switch (booking.status) {
      case "pending":
        return "Chờ xác nhận";
      case "confirmed":
        return "Đã xác nhận";
      case "completed":
        return "Đã hoàn thành";
      case "cancelled":
        return "Đã hủy";
      default:
        return booking.status;
    }
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 lg:p-8 shadow-lg">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-5 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[var(--blue)]/10 flex items-center justify-center border border-[var(--blue)]/20">
          <Calendar className="text-[var(--blue)]" size={18} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800">
            Lịch sử đặt phòng
          </h2>
          <p className="text-[var(--green)] font-semibold text-xs mt-0.5">
            Xem danh sách phòng đã đặt
          </p>
        </div>
      </div>

      {bookingsLoading ? (
        <div className="flex flex-col items-center justify-center py-12 text-[var(--black)]/60 gap-3">
          <Loader2 size={32} className="animate-spin text-[var(--blue)]" />
          <p className="text-sm">Đang tải lịch sử đặt phòng...</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <Calendar
            className="mx-auto text-slate-300 mb-3 animate-pulse"
            size={48}
          />
          <p className="text-[var(--green)] font-semibold text-sm">
            Bạn chưa có đơn đặt phòng nào
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl text-xs font-bold hover:shadow-md cursor-pointer hover:scale-105 transition-all"
          >
            Đặt phòng ngay
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {bookings.map((booking) => (
            <div
              key={booking.bookingId}
              className="border border-slate-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all overflow-hidden"
            >
              {/* Booking Header */}
              <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex flex-wrap justify-between items-center gap-3">
                <div>
                  <span className="text-xs text-[var(--black)]/60 font-bold">
                    Mã đơn đặt phòng:{" "}
                  </span>
                  <span className="text-sm font-bold text-[var(--yellow)]">
                    #{booking.bookingId}
                  </span>
                  <span className="text-xs text-[var(--black)]/60 mx-2">•</span>
                  <span className="text-xs text-[var(--green)] font-semibold">
                    Ngày đặt:{" "}
                    {new Date(booking.createdAt).toLocaleDateString("vi-VN")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${getBookingStatusBadge(
                      booking,
                    )}`}
                  >
                    {getBookingStatusName(booking)}
                  </span>
                </div>
              </div>

              {/* Booking Content */}
              <div className="p-6 flex flex-col gap-6">
                {/* Stay Dates Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl text-xs">
                  <div>
                    <p className="text-[var(--black)]/60 font-bold mb-0.5">
                      Ngày nhận phòng (dự kiến)
                    </p>
                    <p className="font-bold">
                      {new Date(booking.checkInDate).toLocaleDateString(
                        "vi-VN",
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-[var(--black)]/60 font-bold mb-0.5">
                      Ngày trả phòng (dự kiến)
                    </p>
                    <p className="font-bold">
                      {new Date(booking.checkOutDate).toLocaleDateString(
                        "vi-VN",
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-[var(--black)]/60 font-bold mb-0.5">
                      Nhận phòng thực tế
                    </p>
                    <p className="font-bold text-emerald-600">
                      {booking.actualCheckIn
                        ? new Date(booking.actualCheckIn).toLocaleString(
                            "vi-VN",
                          )
                        : ""}
                    </p>
                  </div>
                  <div>
                    <p className="text-[var(--black)]/60 font-bold mb-0.5">
                      Trả phòng thực tế
                    </p>
                    <p className="font-bold text-purple-600">
                      {booking.actualCheckOut
                        ? new Date(booking.actualCheckOut).toLocaleString(
                            "vi-VN",
                          )
                        : ""}
                    </p>
                  </div>
                </div>

                {/* Rooms & Services */}
                <div>
                  <h4 className="text-xs font-bold text-[var(--black)]/60 mb-3">
                    Danh sách phòng & dịch vụ
                  </h4>
                  <div className="flex flex-col gap-4">
                    {booking.bookingDetails?.map((detail) => {
                      const isOccupied =
                        booking.status === "confirmed" &&
                        booking.actualCheckIn &&
                        !booking.actualCheckOut;
                      return (
                        <div
                          key={detail.bookingDetailId}
                          className="border border-slate-100 rounded-xl p-4 flex flex-col gap-3 hover:border-slate-200 transition-colors bg-white"
                        >
                          <div className="flex justify-between items-start flex-wrap gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-bold text-slate-800">
                                  Phòng {detail.room?.roomNumber || "N/A"}
                                </p>
                                {isOccupied && (
                                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                    Đang ở
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-[var(--black)]/60">
                                Loại phòng:{" "}
                                {detail.room?.roomType?.typeName || "N/A"}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-extrabold bg-slate-100 px-2.5 py-1 rounded-lg">
                                {Number(detail.priceAtBooking).toLocaleString(
                                  "vi-VN",
                                )}{" "}
                                VND / Đêm
                              </span>
                              {isOccupied &&
                                booking.servicePaymentStatus !== "paid" && (
                                  <button
                                    onClick={() =>
                                      openAddServiceModal(
                                        detail.bookingDetailId,
                                        detail.room?.roomNumber,
                                      )
                                    }
                                    className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-sm shadow-purple-600/10 hover:scale-[1.02] active:scale-95"
                                  >
                                    <Plus size={12} /> Thêm dịch vụ
                                  </button>
                                )}
                            </div>
                          </div>

                          {/* Added Services */}
                          <div className="bg-slate-50/50 rounded-lg p-3">
                            <p className="text-[10px] font-bold text-[var(--black)]/60 mb-2">
                              Dịch vụ sử dụng
                            </p>
                            {!detail.services ||
                            detail.services.length === 0 ? (
                              <p className="text-xs text-[var(--black)]/60 italic">
                                Chưa sử dụng dịch vụ nào
                              </p>
                            ) : (
                              <div className="flex flex-col gap-1.5">
                                {detail.services.map((bs) => (
                                  <div
                                    key={bs.bookingServiceId}
                                    className="flex justify-between text-xs text-slate-600"
                                  >
                                    <span>
                                      • {bs?.serviceName} (x
                                      {bs.quantity} {bs?.unit})
                                    </span>
                                    <span className="font-semibold">
                                      {(
                                        Number(bs.priceAtUsage) * bs.quantity
                                      ).toLocaleString("vi-VN")}{" "}
                                      VND
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Price breakdown & Actions */}
                <div className="border-t border-slate-100 pt-4 flex justify-between items-center flex-wrap gap-4">
                  <div>
                    {booking.status === "pending" && (
                      <button
                        onClick={() => handleCancelBooking(booking.bookingId)}
                        className="px-4 py-2 border border-rose-200 text-rose-500 hover:bg-rose-50 hover:text-rose-600 rounded-xl text-xs font-bold transition-all cursor-pointer hover:scale-[1.02] active:scale-95 duration-200"
                      >
                        Hủy đặt phòng
                      </button>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between gap-10 text-xs text-[var(--green)] font-semibold">
                      <span>Tiền phòng:</span>
                      <span className="font-semibold">
                        {Number(booking.totalAmount).toLocaleString("vi-VN")}{" "}
                        VND
                      </span>
                    </div>
                    {booking.serviceAmount > 0 && (
                      <div className="flex justify-between gap-10 text-xs text-[var(--green)] font-semibold">
                        <span>Tiền dịch vụ:</span>
                        <span className="font-semibold">
                          {Number(booking.serviceAmount).toLocaleString(
                            "vi-VN",
                          )}{" "}
                          VND
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between gap-10 text-sm font-bold text-slate-800 border-t border-slate-100 pt-1.5">
                      <span>Tổng cộng:</span>
                      <span className="text-[var(--red)] text-base font-bold">
                        {(
                          Number(booking.totalAmount) +
                          Number(booking.serviceAmount)
                        ).toLocaleString("vi-VN")}{" "}
                        VND
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingHistoryTab;
