import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ImageGallery = ({ images }) => {
  const [active, setActive] = useState(0);
  if (!images?.length)
    return (
      <div className="w-full h-72 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 text-sm">
        Chưa có hình ảnh
      </div>
    );
  return (
    <div className="flex flex-col gap-2">
      <div className="relative w-full h-80 rounded-t-2xl overflow-hidden">
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
        <div className="flex gap-2 overflow-x-auto pb-2 px-6">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition cursor-pointer ${
                i === active
                  ? "border-[var(--blue)]"
                  : "border-transparent opacity-50 hover:opacity-80"
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

export default ImageGallery;
