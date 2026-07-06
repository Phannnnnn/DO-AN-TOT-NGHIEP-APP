import { BedDouble, Users, Wind } from "lucide-react";
import ImageGallery from "./ImageGallery";
import { formatVND, CATEGORY_LABEL, AMENITY_ICON } from "../utils";

const RoomCard = ({ room }) => {
  const grouped = (room.roomTypeAmenities ?? []).reduce((acc, a) => {
    const cat = a.category || "other";
    (acc[cat] = acc[cat] || []).push(a);
    return acc;
  }, {});

  return (
    <div className="bg-white border border-slate-100 shadow-sm rounded-2xl overflow-hidden">
      <ImageGallery images={room.roomImages} />
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-800">
              {room.roomType?.typeName}
            </h3>
            <p className="text-sm text-slate-500 mt-0.5">
              Tầng {room.floor} · Phòng {room.roomNumber}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-slate-800">
              {formatVND(parseFloat(room.pricePlan?.basePrice ?? 0))}
            </p>
            <p className="text-xs text-slate-400">/đêm</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {(room.roomBeds ?? []).map((b, i) => (
            <span
              key={i}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200/50 px-2.5 py-1 rounded-full"
            >
              <BedDouble size={11} className="text-[var(--blue)]" />{" "}
              {b.quantity}× {b.roomBedType}
            </span>
          ))}
          <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200/50 px-2.5 py-1 rounded-full">
            <Users size={11} className="text-[var(--blue)]" /> Tối đa{" "}
            {room.roomType?.maxOccupancy} khách
          </span>
        </div>

        {room.roomType?.description && (
          <p className="text-sm text-slate-500 leading-relaxed mb-5">
            {room.roomType.description}
          </p>
        )}

        {Object.keys(grouped).length > 0 && (
          <div className="border-t border-slate-100 pt-4 flex flex-col gap-4">
            {Object.entries(grouped).map(([cat, items]) => (
              <div key={cat}>
                <p className="text-xs font-bold text-slate-400 mb-2 flex items-center gap-1.5">
                  <span className="text-[var(--blue)]">
                    {AMENITY_ICON[cat] ?? <Wind size={13} />}
                  </span>
                  {CATEGORY_LABEL[cat] ?? cat}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((a) => (
                    <span
                      key={a.roomAmenityId}
                      className="text-xs text-slate-600 bg-slate-50 border border-slate-200/60 px-2.5 py-1 rounded-full"
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

export default RoomCard;
