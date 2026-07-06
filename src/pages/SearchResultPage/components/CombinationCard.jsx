import { Sparkles, DoorOpen, BedDouble, Users, ChevronRight, Check } from "lucide-react";
import { formatVND } from "../utils";

const CombinationCard = ({ combo, nights, onClick }) => {
  const isMulti = combo.rooms.length > 1;
  const pricePerNight = combo.rooms.reduce(
    (sum, r) => sum + (r.roomType.activePrice ?? 0),
    0,
  );
  const totalPrice = pricePerNight * nights;
  const allBeds = combo.rooms.flatMap((r) => r.roomType.roomBeds ?? []);

  let img =
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=800";
  for (const r of combo.rooms) {
    const images = r.roomType?.roomImages || [];
    const cover = images.find((i) => i.isCover);
    if (cover?.url) {
      img = cover.url;
      break;
    } else if (images[0]?.url) {
      img = images[0].url;
      break;
    }
  }

  const roomName = combo.rooms.map((r) => r.roomType.typeName).join(" + ");

  const comboAmenities = combo.rooms.flatMap(
    (r) => r.roomType?.roomTypeAmenities ?? [],
  );
  const uniqueAmenities = [];
  const seen = new Set();
  for (const a of comboAmenities) {
    if (!seen.has(a.roomAmenityId)) {
      seen.add(a.roomAmenityId);
      uniqueAmenities.push(a);
    }
  }

  return (
    <div
      onClick={onClick}
      className="group relative flex flex-col bg-white rounded-3xl border border-slate-100 hover:border-purple-200 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden shadow-sm"
    >
      <div className="relative h-52 w-full overflow-hidden">
        <img
          src={img}
          alt={roomName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {isMulti && (
          <div className="absolute top-4 left-4 bg-[var(--blue)] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
            Kết hợp {combo.rooms.length} phòng
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-[var(--blue)] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
          <Sparkles size={10} /> Đề xuất
        </div>
        {/* Chips số phòng ở góc dưới ảnh */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
          {combo.rooms.map((r) => (
            <span
              key={r.roomId}
              className="flex items-center gap-1 bg-black/50 backdrop-blur text-white text-xs font-bold px-2.5 py-1 rounded-full"
            >
              <DoorOpen size={10} /> P.{r.roomNumber}
            </span>
          ))}
        </div>
      </div>

      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-xl font-bold text-slate-800 group-hover:text-[var(--blue)] transition-colors truncate">
            {roomName}
          </h3>
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {allBeds.slice(0, 2).map((b, i) => (
              <span
                key={i}
                className="flex items-center gap-1 text-xs font-bold text-slate-600 bg-slate-100 border border-slate-200/50 px-2.5 py-0.5 rounded-md"
              >
                <BedDouble size={9} /> {b.quantity}× {b.roomBedType}
              </span>
            ))}
            <span className="flex items-center gap-1 text-xs font-bold text-slate-600 bg-slate-100 border border-slate-200/50 px-2.5 py-0.5 rounded-md">
              <Users size={9} /> {combo.totalCapacity} khách
            </span>
          </div>
        </div>

        <div className="flex items-end justify-between mt-6 pt-4 border-t border-slate-100">
          <div className="flex flex-wrap gap-2">
            {uniqueAmenities.slice(0, 3).map((a) => (
              <span
                key={a.roomAmenityId}
                className="flex items-center gap-1 text-xs text-slate-400"
              >
                <Check size={9} className="text-emerald-500" />{" "}
                {a.roomAmenityName}
              </span>
            ))}
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs font-bold text-slate-400 mb-1">
              Tổng cộng ({nights} đêm)
            </p>
            <p className="text-2xl font-bold text-slate-900 leading-none">
              {formatVND(totalPrice)}
            </p>
            <div className="mt-3 flex items-center justify-end gap-1 bg-[var(--blue)] hover:bg-purple-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition shadow-md shadow-purple-500/10">
              Chi tiết <ChevronRight size={12} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinationCard;
