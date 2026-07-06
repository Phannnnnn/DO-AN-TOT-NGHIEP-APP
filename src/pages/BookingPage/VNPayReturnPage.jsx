import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import { paymentService } from "@/services";
import { useNotification } from "@/context/ContextProvider";

const formatVND = (amount) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    amount,
  );

const VNPayReturnPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const toast = useNotification();

  const [loading, setLoading] = useState(true);
  const [bookingDetail, setBookingDetail] = useState(null);

  // VNPay query params
  const responseCode = searchParams.get("vnp_ResponseCode");
  const txnRef = searchParams.get("vnp_TxnRef");
  const amountRaw = searchParams.get("vnp_Amount");
  const bankCode = searchParams.get("vnp_BankCode");
  const transNo = searchParams.get("vnp_TransactionNo");

  const isSuccess = responseCode === "00";
  const amount = amountRaw ? Number(amountRaw) / 100 : 0;

  // Extract booking ID
  const isServicePayment = txnRef?.startsWith("svc_");
  const bookingId = isServicePayment ? txnRef.replace("svc_", "") : txnRef;

  useEffect(() => {
    const processPaymentAndFetchDetails = async () => {
      if (!bookingId) {
        setLoading(false);
        return;
      }

      // 1. Tự động gửi tham số thanh toán đến IPN của Backend để xác thực và cập nhật trạng thái đơn đặt
      if (isSuccess && searchParams.has("vnp_SecureHash")) {
        try {
          const params = {};
          searchParams.forEach((value, key) => {
            params[key] = value;
          });

          if (isServicePayment) {
            await paymentService.handleServiceIpn(params);
          } else {
            await paymentService.handleIpn(params);
          }
        } catch (err) {
          console.error("Lỗi khi tự động xử lý IPN:", err);
        }
      }

      // 2. Tải thông tin chi tiết đơn đặt phòng sau khi đã cập nhật trạng thái
      try {
        const params = {};
        searchParams.forEach((value, key) => {
          params[key] = value;
        });
        const res = await paymentService.verifyReturn(params);
        if (res.success && res.data) {
          setBookingDetail(res.data);
        }
      } catch (err) {
        console.error("Lỗi khi tải thông tin chi tiết đơn hàng:", err);
      } finally {
        setLoading(false);
      }
    };

    processPaymentAndFetchDetails();
  }, [bookingId, isSuccess, isServicePayment, searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-20">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <Loader2 size={36} className="animate-spin text-[var(--blue)]" />
          <p className="text-sm font-medium">Đang xử lý kết quả giao dịch...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-28 pb-16 relative flex items-center justify-center">
      {/* Decorative Blur Elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-[var(--blue)]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full mx-auto px-6 relative z-10">
        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-2xl relative overflow-hidden text-center">
          {/* Top colored stripe */}
          <div
            className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${isSuccess ? "from-emerald-500 to-teal-500" : "from-rose-500 to-red-500"}`}
          />

          {/* Status Icon with animation */}
          <div className="flex justify-center mb-6">
            {isSuccess ? (
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shadow-md animate-bounce">
                <CheckCircle2 size={36} className="text-emerald-500" />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center shadow-md animate-pulse">
                <AlertTriangle size={36} className="text-rose-500" />
              </div>
            )}
          </div>

          {/* Status Text */}
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            {isSuccess ? "Thanh toán thành công" : "Thanh toán thất bại"}
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            {isSuccess
              ? "Cảm ơn quý khách. Giao dịch thanh toán của bạn đã được hoàn tất thành công."
              : "Rất tiếc. Giao dịch thanh toán đã bị hủy hoặc xảy ra lỗi trong quá trình thực hiện."}
          </p>

          {/* Transaction Info Table */}
          <div className="bg-slate-50 rounded-2xl p-5 text-left text-xs mb-8 flex flex-col gap-3.5 border border-slate-100">
            <div className="flex justify-between">
              <span className="text-slate-400 font-bold">Loại giao dịch:</span>
              <span className="font-semibold text-slate-700">
                {isServicePayment
                  ? "Thanh toán dịch vụ phòng"
                  : "Thanh toán tiền phòng"}
              </span>
            </div>

            {bookingDetail && (
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">Khách hàng:</span>
                <span className="font-semibold text-slate-700">
                  {bookingDetail.guestName || bookingDetail.customer?.fullName}
                </span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-slate-400 font-bold">Mã đặt phòng:</span>
              <span className="font-bold text-slate-800">#{bookingId}</span>
            </div>

            <div className="flex justify-between border-t border-slate-200/60 pt-3">
              <span className="text-slate-400 font-bold">
                Số tiền thanh toán:
              </span>
              <span className="font-bold text-[var(--blue)] text-sm">
                {formatVND(amount)}
              </span>
            </div>

            {bankCode && (
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">Ngân hàng:</span>
                <span className="font-semibold text-slate-700">{bankCode}</span>
              </div>
            )}

            {transNo && (
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">
                  Mã giao dịch VNPay:
                </span>
                <span className="font-semibold text-slate-600 select-all">
                  {transNo}
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/")}
              className="w-full h-12 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 font-semibold text-sm transition cursor-pointer"
            >
              Quay lại trang chủ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VNPayReturnPage;
