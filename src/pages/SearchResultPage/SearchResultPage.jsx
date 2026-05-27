import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format, parseISO, differenceInDays } from "date-fns";
import { vi } from "date-fns/locale";
import {
  Search,
  Users,
  Moon,
  BedDouble,
  ChevronRight,
  ArrowLeft,
  Star,
  Check,
  SlidersHorizontal,
} from "lucide-react";
import { bookingService } from "@/services/booking/bookingService";

const formatVND = (amount) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    amount,
  );

const ROOM_IMAGES = [
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=800",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800",
  "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800",
  "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=800",
  "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800",
  "https://images.unsplash.com/photo-1564078516393-cf04bd966897?q=80&w=800",
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=800",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800",
];

const SearchResultPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const checkInDate = searchParams.get("checkInDate");
  const checkOutDate = searchParams.get("checkOutDate");
  const adults = searchParams.get("adults") ?? "1";
  const children = searchParams.get("children") ?? "0";

  const [combinations, setCombinations] = useState([]);
  const [loading, setLoading] = useState(true);

  const nights =
    checkInDate && checkOutDate
      ? Math.max(
          1,
          differenceInDays(parseISO(checkOutDate), parseISO(checkInDate)),
        )
      : 1;
  const fmtDate = (d) =>
    d ? format(parseISO(d), "dd MMM", { locale: vi }) : "";

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const res = await bookingService.getAvailableRooms({
          checkInDate,
          checkOutDate,
          adults: Number(adults),
          children: Number(children),
        });
        setCombinations(
          res.success && res.data?.combinations ? res.data.combinations : [],
        );
      } catch {
        setCombinations([]);
      } finally {
        setLoading(false);
      }
    };
    if (checkInDate && checkOutDate) fetchRooms();
    else setLoading(false);
  }, [checkInDate, checkOutDate, adults, children]);

  return (
    <div className="min-h-screen bg-[#0a1628]">
      {/* ── Top bar ── */}
      <div className="sticky top-0 z-20 bg-[#0a1628]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-white/50 hover:text-white transition text-sm font-semibold cursor-pointer shrink-0"
          >
            <ArrowLeft size={15} /> Trang chủ
          </button>
          <div className="h-4 w-px bg-white/15" />
          <div className="flex items-center gap-3 text-sm flex-1">
            <span className="text-[var(--blue)] font-semibold flex items-center gap-1.5">
              <Moon size={13} /> {fmtDate(checkInDate)} →{" "}
              {fmtDate(checkOutDate)}
              <span className="text-white/30 font-normal text-xs">
                ({nights} đêm)
              </span>
            </span>
            <div className="h-3 w-px bg-white/15" />
            <span className="text-white/50 text-xs flex items-center gap-1.5">
              <Users size={12} /> {adults} người lớn
              {Number(children) > 0 ? `, ${children} trẻ em` : ""}
            </span>
          </div>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[var(--blue)] border border-[var(--blue)]/40 hover:border-[var(--blue)] px-3 py-1.5 rounded-lg transition cursor-pointer shrink-0"
          >
            <Search size={12} /> Tìm lại
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* ── Header ── */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[var(--blue)] text-xs font-black uppercase tracking-[0.3em] mb-2">
              Kết quả tìm kiếm
            </p>
            <h1 className="text-4xl font-black text-white uppercase leading-tight">
              {loading ? "Đang tìm kiếm..." : `${combinations.length} lựa chọn`}
              <br />
              <span className="text-[var(--blue)]">phù hợp cho bạn</span>
            </h1>
            <p className="text-white/40 text-sm mt-2">
              {adults} người lớn
              {Number(children) > 0 ? `, ${children} trẻ em` : ""} · {nights}{" "}
              đêm
            </p>
          </div>
          <button className="flex items-center gap-2 text-sm font-semibold text-white/60 border border-white/15 hover:border-white/40 px-4 py-2.5 rounded-xl transition cursor-pointer">
            <SlidersHorizontal size={15} /> Lọc
          </button>
        </div>

        {/* ── Loading ── */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-10 h-10 border-2 border-[var(--blue)] border-t-transparent rounded-full animate-spin" />
            <p className="text-white/40 text-sm">Đang tìm phòng phù hợp...</p>
          </div>
        )}

        {/* ── Empty ── */}
        {!loading && combinations.length === 0 && (
          <div className="text-center py-32 border border-dashed border-white/10 rounded-3xl">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
              <BedDouble size={28} className="text-white/30" />
            </div>
            <h3 className="text-xl font-black text-white uppercase mb-2">
              Không tìm thấy phòng trống
            </h3>
            <p className="text-white/40 text-sm mb-6">
              Vui lòng thử ngày khác hoặc điều chỉnh số lượng khách.
            </p>
            <button
              onClick={() => navigate("/")}
              className="text-sm font-black uppercase tracking-wider text-[#0a1628] bg-[var(--blue)] hover:opacity-90 px-6 py-3 rounded-xl transition cursor-pointer"
            >
              Tìm lại
            </button>
          </div>
        )}

        {/* ── Results: grid 2 cột ── */}
        {!loading && combinations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {combinations.map((combo, idx) => {
              const isMulti = combo.rooms.length > 1;
              const pricePerNight = combo.rooms.reduce(
                (sum, r) => sum + (r.roomType.activePrice ?? 0),
                0,
              );
              const totalPrice = pricePerNight * nights;
              const allBeds = combo.rooms.flatMap(
                (r) => r.roomType.roomBeds ?? [],
              );
              const img = ROOM_IMAGES[idx % ROOM_IMAGES.length];
              const roomName = combo.rooms
                .map((r) => r.roomType.typeName)
                .join(" + ");

              return (
                <div
                  key={idx}
                  className="group relative rounded-3xl overflow-hidden cursor-pointer h-80 shadow-2xl"
                  onClick={() =>
                    navigate("/rooms/detail", {
                      state: {
                        combo,
                        checkInDate,
                        checkOutDate,
                        adults,
                        children,
                      },
                    })
                  }
                >
                  {/* Ảnh nền full */}
                  <img
                    src={img}
                    alt={roomName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Overlay gradient từ dưới lên */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/40 to-transparent" />

                  {/* Badge top-left */}
                  {isMulti && (
                    <div className="absolute top-4 left-4 bg-[var(--blue)] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full">
                      Kết hợp {combo.rooms.length} phòng
                    </div>
                  )}

                  {/* Rating top-right */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2.5 py-1.5 rounded-full">
                    <Star
                      size={11}
                      className="fill-[var(--blue)] text-[var(--blue)]"
                    />
                    <span className="text-white text-xs font-black">4.8</span>
                  </div>

                  {/* Nội dung đè lên ảnh phía dưới */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    {/* Beds */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {allBeds.slice(0, 2).map((b, i) => (
                        <span
                          key={i}
                          className="flex items-center gap-1 text-[10px] font-semibold text-white/70 bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full"
                        >
                          <BedDouble size={9} /> {b.quantity}× {b.roomBedType}
                        </span>
                      ))}
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-white/70 bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full">
                        <Users size={9} /> {combo.totalCapacity} khách
                      </span>
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="text-xl font-black text-white uppercase tracking-wide leading-tight">
                          {roomName}
                        </h3>
                        <div className="flex gap-3 mt-1.5">
                          {["Wifi", "Bữa sáng", "Hủy miễn phí"].map((a) => (
                            <span
                              key={a}
                              className="flex items-center gap-1 text-[10px] text-white/50"
                            >
                              <Check size={9} className="text-[var(--blue)]" />{" "}
                              {a}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="text-right shrink-0 ml-4">
                        <p className="text-2xl font-black text-white leading-none">
                          {formatVND(totalPrice)}
                        </p>
                        <p className="text-[10px] text-white/40 mt-0.5">
                          {formatVND(pricePerNight)}
                          <span className="text-[var(--blue)]">/đêm</span>
                        </p>
                        <div className="mt-2 flex items-center justify-end gap-1 bg-[var(--blue)] hover:opacity-90 text-white text-xs font-black uppercase tracking-wide px-3 py-1.5 rounded-xl transition">
                          Xem chi tiết <ChevronRight size={12} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultPage;
