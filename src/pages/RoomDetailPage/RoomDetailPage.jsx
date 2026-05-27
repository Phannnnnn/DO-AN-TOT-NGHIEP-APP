import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { differenceInDays, parseISO, format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  ArrowLeft,
  Users,
  Moon,
  BedDouble,
  ChevronRight,
  ChevronLeft,
  Wifi,
  Wind,
  Tv,
  Coffee,
  Bath,
  Star,
  Loader2,
  Check,
} from "lucide-react";
import { toast } from "react-toastify";
import { roomHoldService, roomService } from "@/services";

const formatVND = (amount) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    amount,
  );

const CATEGORY_LABEL = {
  bathroom: "Phòng tắm",
  bedroom: "Phòng ngủ",
  kitchen: "Bếp",
  living: "Phòng khách",
  entertainment: "Giải trí",
  service: "Dịch vụ",
  outdoor: "Ngoài trời",
  other: "Khác",
};
const AMENITY_ICON = {
  bathroom: <Bath size={13} />,
  bedroom: <Star size={13} />,
  entertainment: <Tv size={13} />,
  service: <Coffee size={13} />,
  other: <Wifi size={13} />,
};

/* ── Gallery: ảnh lớn full-bleed + thumbnails ── */
const ImageGallery = ({ images }) => {
  const [active, setActive] = useState(0);
  if (!images?.length)
    return (
      <div className="w-full h-72 bg-white/5 rounded-2xl flex items-center justify-center text-white/30 text-sm">
        Chưa có hình ảnh
      </div>
    );
  return (
    <div className="flex flex-col gap-2">
      <div className="relative w-full h-80 rounded-2xl overflow-hidden">
        <img
          src={images[active].url}
          alt={images[active].altText ?? "Room"}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {images.length > 1 && (
          <>
            <button
              onClick={() =>
                setActive((p) => (p - 1 + images.length) % images.length)
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 backdrop-blur rounded-full flex items-center justify-center hover:bg-black/60 transition cursor-pointer"
            >
              <ChevronLeft size={18} className="text-white" />
            </button>
            <button
              onClick={() => setActive((p) => (p + 1) % images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 backdrop-blur rounded-full flex items-center justify-center hover:bg-black/60 transition cursor-pointer"
            >
              <ChevronRight size={18} className="text-white" />
            </button>
          </>
        )}
        <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full">
          {active + 1} / {images.length}
        </div>
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition cursor-pointer ${
                i === active
                  ? "border-[var(--blue)]"
                  : "border-transparent opacity-40 hover:opacity-80"
              }`}
            >
              <img
                src={img.url}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* ── Room Card: dark style ── */
const RoomCard = ({ room }) => {
  const grouped = (room.roomTypeAmenities ?? []).reduce((acc, a) => {
    const cat = a.category || "other";
    (acc[cat] = acc[cat] || []).push(a);
    return acc;
  }, {});

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      <ImageGallery images={room.roomImages} />
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-black text-white uppercase">
              {room.roomType?.typeName}
            </h3>
            <p className="text-sm text-white/40 mt-0.5">
              Tầng {room.floor} · Phòng {room.roomNumber}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xl font-black text-white">
              {formatVND(parseFloat(room.pricePlan?.basePrice ?? 0))}
            </p>
            <p className="text-xs text-white/40">/đêm</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {(room.roomBeds ?? []).map((b, i) => (
            <span
              key={i}
              className="flex items-center gap-1.5 text-[11px] font-semibold text-white/70 bg-white/10 border border-white/10 px-2.5 py-1 rounded-full"
            >
              <BedDouble size={11} className="text-[var(--blue)]" />{" "}
              {b.quantity}× {b.roomBedType}
            </span>
          ))}
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-white/70 bg-white/10 border border-white/10 px-2.5 py-1 rounded-full">
            <Users size={11} className="text-[var(--blue)]" /> Tối đa{" "}
            {room.roomType?.maxOccupancy} khách
          </span>
        </div>

        {room.roomType?.description && (
          <p className="text-sm text-white/50 leading-relaxed mb-5">
            {room.roomType.description}
          </p>
        )}

        {Object.keys(grouped).length > 0 && (
          <div className="border-t border-white/10 pt-4 flex flex-col gap-4">
            {Object.entries(grouped).map(([cat, items]) => (
              <div key={cat}>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2 flex items-center gap-1.5">
                  <span className="text-[var(--blue)]">
                    {AMENITY_ICON[cat] ?? <Wind size={13} />}
                  </span>
                  {CATEGORY_LABEL[cat] ?? cat}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((a) => (
                    <span
                      key={a.roomAmenityId}
                      className="text-[11px] text-white/50 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full"
                    >
                      {a.roomAmenityName}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Main ── */
const RoomDetailPage = () => {
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
        e?.response?.data?.message ?? "Không thể giữ phòng. Vui lòng thử lại.",
      );
    } finally {
      setHolding(false);
    }
  };

  if (!combo)
    return (
      <div className="min-h-screen bg-[#0a1628] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/40 mb-4">Không tìm thấy thông tin phòng.</p>
          <button
            onClick={() => navigate("/")}
            className="text-sm font-black text-[#0a1628] bg-[var(--blue)] px-6 py-3 rounded-xl cursor-pointer uppercase"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0a1628]">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-[#0a1628]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-white/50 hover:text-white transition text-sm font-semibold cursor-pointer shrink-0"
          >
            <ArrowLeft size={15} /> Quay lại
          </button>
          <div className="h-4 w-px bg-white/15" />
          <div className="flex items-center gap-3 text-sm flex-1">
            <span className="text-[var(--blue)] font-semibold">
              {fmtDate(checkInDate)} → {fmtDate(checkOutDate)}
            </span>
            <span className="text-white/20">·</span>
            <span className="text-white/40 text-xs">
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
            <p className="text-[var(--blue)] text-xs font-black uppercase tracking-[0.3em] mb-2">
              Chi tiết phòng
            </p>
            <h1 className="text-3xl font-black text-white uppercase leading-tight">
              {combo.rooms.map((r) => r.roomType?.typeName).join(" + ")}
            </h1>
            {combo.rooms.length > 1 && (
              <span className="inline-block mt-2 text-[11px] font-black uppercase tracking-wider text-white bg-[var(--blue)] px-3 py-1 rounded-full">
                Kết hợp {combo.rooms.length} phòng
              </span>
            )}
          </div>

          {loading ? (
            <div className="flex flex-col items-center py-20 gap-3">
              <div className="w-10 h-10 border-2 border-[var(--blue)] border-t-transparent rounded-full animate-spin" />
              <p className="text-white/40 text-sm">
                Đang tải thông tin phòng...
              </p>
            </div>
          ) : (
            rooms.map((room) => <RoomCard key={room.roomId} room={room} />)
          )}
        </div>

        {/* Right: summary sticky */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-5 backdrop-blur-sm">
            <p className="text-xs font-black uppercase tracking-widest text-white/30">
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
                  <span className="text-white/40">{row.label}</span>
                  <span className="font-semibold text-white text-right">
                    {row.val}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-4 flex flex-col gap-2">
              {rooms.map((r) => (
                <div key={r.roomId} className="flex justify-between text-sm">
                  <span className="text-white/40">
                    Phòng {r.roomNumber} × {nights} đêm
                  </span>
                  <span className="font-semibold text-white">
                    {formatVND(
                      parseFloat(r.pricePlan?.basePrice ?? 0) * nights,
                    )}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-4">
              <div className="flex justify-between items-end mb-1">
                <p className="text-xs text-white/40">Tổng cộng</p>
                <p className="text-2xl font-black text-white">
                  {formatVND(totalPrice)}
                </p>
              </div>
              <p className="text-[11px] text-white/25 text-right">
                Đã bao gồm thuế & phí
              </p>
            </div>

            <button
              onClick={handleBook}
              disabled={holding || loading}
              className="w-full flex items-center justify-center gap-2 bg-[var(--blue)] hover:opacity-90 disabled:opacity-50 text-white font-black text-sm uppercase tracking-wider py-4 rounded-xl transition cursor-pointer"
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
            <p className="text-[11px] text-white/25 text-center">
              Phòng được giữ trong 15 phút sau khi đặt
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailPage;
