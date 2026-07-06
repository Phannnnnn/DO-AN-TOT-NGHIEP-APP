import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { differenceInDays, parseISO, format } from "date-fns";
import { vi } from "date-fns/locale";
import { ArrowLeft, ChevronRight, Loader2 } from "lucide-react";
import { useNotification } from "@/context/ContextProvider";
import { roomHoldService, roomService } from "@/services";
import { formatVND } from "./utils";
import RoomCard from "./components/RoomCard";

/* ── Main ── */
const RoomDetailPage = () => {
  const toast = useNotification();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { combo, checkInDate, checkOutDate, adults, children } = state ?? {};
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [holding, setHolding] = useState(false);

  const nights =
    checkInDate && checkOutDate
      ? Math.max(
          1,
          differenceInDays(parseISO(checkOutDate), parseISO(checkInDate)),
        )
      : 1;
  const fmtDate = (d) =>
    d ? format(parseISO(d), "dd MMM yyyy", { locale: vi }) : "";
  const pricePerNight = rooms.reduce(
    (sum, r) => sum + parseFloat(r.pricePlan?.basePrice ?? 0),
    0,
  );
  const totalPrice = pricePerNight * nights;

  useEffect(() => {
    if (!combo?.rooms?.length) {
      setLoading(false);
      return;
    }
    const fetchAll = async () => {
      setLoading(true);
      try {
        const results = await Promise.all(
          combo.rooms.map((r) => roomService.roomById(r.roomId)),
        );
        setRooms(results.map((res) => res.data).filter(Boolean));
      } catch {
        setRooms([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const handleBook = async () => {
    setHolding(true);
    try {
      const res = await roomHoldService.hold({
        roomIds: combo.rooms.map((r) => r.roomId),
        checkInDate,
        checkOutDate,
      });
      if (res.success) {
        navigate("/booking", {
          state: {
            combo,
            rooms,
            checkInDate,
            checkOutDate,
            adults,
            children,
            totalPrice,
            nights,
            ...res.data,
          },
        });
      }
    } catch (e) {
      toast.error(
        "Lỗi giữ phòng",
        e?.message ?? "Không thể giữ phòng. Vui lòng thử lại.",
      );
    } finally {
      setHolding(false);
    }
  };

  if (!combo)
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-800">
        <div className="text-center">
          <p className="text-slate-500 mb-4">Không tìm thấy thông tin phòng.</p>
          <button
            onClick={() => navigate("/")}
            className="text-sm font-bold text-white bg-[var(--blue)] hover:bg-purple-700 px-6 py-3 rounded-xl cursor-pointer transition"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 transition text-sm font-semibold cursor-pointer shrink-0"
          >
            <ArrowLeft size={15} /> Quay lại
          </button>
          <div className="h-4 w-px bg-slate-200" />
          <div className="flex items-center gap-3 text-sm flex-1">
            <span className="text-[var(--blue)] font-semibold">
              {fmtDate(checkInDate)} → {fmtDate(checkOutDate)}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-500 text-xs">
              {nights} đêm · {adults} người lớn
              {Number(children) > 0 ? `, ${children} trẻ em` : ""}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left: chi tiết */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div>
            <p className="text-[var(--blue)] text-xs font-bold mb-2">
              Chi tiết phòng
            </p>
            <h1 className="text-3xl font-bold text-slate-800 leading-tight">
              {combo.rooms.map((r) => r.roomType?.typeName).join(" + ")}
            </h1>
            {combo.rooms.length > 1 && (
              <span className="inline-block mt-2 text-xs font-bold text-white bg-[var(--blue)] px-3 py-1 rounded-full">
                Kết hợp {combo.rooms.length} phòng
              </span>
            )}
          </div>

          {loading ? (
            <div className="flex flex-col items-center py-20 gap-3">
              <div className="w-10 h-10 border-2 border-[var(--blue)] border-t-transparent rounded-full animate-spin" />
              <p className="text-slate-500 text-sm">
                Đang tải thông tin phòng...
              </p>
            </div>
          ) : (
            rooms.map((room) => <RoomCard key={room.roomId} room={room} />)
          )}
        </div>

        {/* Right: summary sticky */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 bg-white border border-slate-100 rounded-2xl p-6 flex flex-col gap-5 shadow-lg">
            <p className="text-xs font-bold text-slate-400">
              Tóm tắt đặt phòng
            </p>

            <div className="flex flex-col gap-2 text-sm">
              {[
                { label: "Nhận phòng", val: fmtDate(checkInDate) },
                { label: "Trả phòng", val: fmtDate(checkOutDate) },
                { label: "Số đêm", val: `${nights} đêm` },
                {
                  label: "Khách",
                  val: `${adults} người lớn${Number(children) > 0 ? `, ${children} trẻ em` : ""}`,
                },
              ].map((row) => (
                <div key={row.label} className="flex justify-between">
                  <span className="text-slate-400">{row.label}</span>
                  <span className="font-semibold text-slate-800 text-right">
                    {row.val}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-4 flex flex-col gap-2">
              {rooms.map((r) => (
                <div key={r.roomId} className="flex justify-between text-sm">
                  <span className="text-slate-400">
                    Phòng {r.roomNumber} × {nights} đêm
                  </span>
                  <span className="font-semibold text-slate-800">
                    {formatVND(
                      parseFloat(r.pricePlan?.basePrice ?? 0) * nights,
                    )}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-4">
              <div className="flex justify-between items-end mb-1">
                <p className="text-xs text-slate-400">Tổng cộng</p>
                <p className="text-2xl font-bold text-slate-900">
                  {formatVND(totalPrice)}
                </p>
              </div>
              <p className="text-xs text-slate-400 text-right">
                Đã bao gồm thuế & phí
              </p>
            </div>

            <button
              onClick={handleBook}
              disabled={holding || loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 text-white font-bold text-sm py-4 rounded-xl transition cursor-pointer shadow-md shadow-purple-600/10"
            >
              {holding ? (
                <>
                  <Loader2 size={15} className="animate-spin" /> Đang xử lý...
                </>
              ) : (
                <>
                  Đặt phòng ngay <ChevronRight size={15} />
                </>
              )}
            </button>
            <p className="text-xs text-slate-400 text-center">
              Phòng được giữ trong 15 phút trong khi đặt
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailPage;
