import React, { useState, useEffect, useRef } from "react";
import { Check, Loader2, Copy, CheckCircle } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useNotification } from "@/context/ContextProvider";
import { paymentService, bookingService } from "@/services";

const StepPayment = ({ bookingResult, onPaid }) => {
  const toast = useNotification();
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [loadingQR, setLoadingQR] = useState(true);
  const [copied, setCopied] = useState(false);
  const [paid, setPaid] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const create = async () => {
      try {
        const res = await paymentService.createPayment(bookingResult.bookingId);
        if (res.success) setPaymentUrl(res.data?.paymentUrl ?? res.data);
      } catch {
        toast.error("Lỗi", "Không thể tạo link thanh toán.");
      } finally {
        setLoadingQR(false);
      }
    };
    if (bookingResult?.bookingId) create();
  }, [bookingResult?.bookingId]);

  useEffect(() => {
    if (!bookingResult?.bookingId || paid) return;
    intervalRef.current = setInterval(async () => {
      try {
        const res = await bookingService.bookingById(bookingResult.bookingId);
        if (res.data?.paymentStatus === "paid") {
          clearInterval(intervalRef.current);
          onPaid(res.data);
        }
      } catch (error) {
        console.error("Lỗi khi kiểm tra trạng thái đặt phòng:", error);
      }
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, [bookingResult?.bookingId, paid]);

  if (paid)
    return (
      <div className="text-center py-6 flex flex-col items-center gap-3">
        <div className="w-14 h-14 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
          <Check size={28} className="text-green-500" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">
          Thanh toán thành công!
        </h3>
        <p className="text-sm text-slate-500">
          Mã đặt phòng:{" "}
          <span className="font-bold text-slate-800">
            #{bookingResult?.bookingId}
          </span>
        </p>
      </div>
    );

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-slate-500 text-center">
        Quét mã QR để thanh toán qua VNPAY
      </p>
      {loadingQR ? (
        <div className="w-52 h-52 flex items-center justify-center">
          <Loader2 size={28} className="animate-spin text-[var(--blue)]" />
        </div>
      ) : paymentUrl ? (
        <div className="p-4 bg-white rounded-2xl shadow-xl border border-slate-100">
          <QRCodeSVG value={paymentUrl} size={200} />
        </div>
      ) : (
        <div className="w-52 h-52 flex items-center justify-center bg-slate-50 border border-slate-200/60 rounded-2xl text-sm text-slate-400">
          Không tạo được QR
        </div>
      )}
      {paymentUrl && (
        <button
          onClick={() => {
            navigator.clipboard.writeText(paymentUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="flex items-center gap-2 text-xs font-semibold text-slate-500 border border-slate-200 hover:bg-slate-50 px-4 py-2 rounded-xl transition cursor-pointer"
        >
          {copied ? (
            <>
              <CheckCircle size={13} className="text-green-500" /> Đã sao chép
            </>
          ) : (
            <>
              <Copy size={13} /> Sao chép link
            </>
          )}
        </button>
      )}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Loader2 size={12} className="animate-spin text-[var(--blue)]" /> Đang
        chờ xác nhận thanh toán...
      </div>
    </div>
  );
};

export default StepPayment;
