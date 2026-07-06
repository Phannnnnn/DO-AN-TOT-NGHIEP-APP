import { Bath, Star, Tv, Coffee, Wifi } from "lucide-react";

export const formatVND = (amount) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    amount,
  );

export const CATEGORY_LABEL = {
  bathroom: "Phòng tắm",
  bedroom: "Phòng ngủ",
  kitchen: "Bếp",
  living: "Phòng khách",
  entertainment: "Giải trí",
  service: "Dịch vụ",
  outdoor: "Ngoài trời",
  other: "Khác",
};

export const AMENITY_ICON = {
  bathroom: <Bath size={13} />,
  bedroom: <Star size={13} />,
  entertainment: <Tv size={13} />,
  service: <Coffee size={13} />,
  other: <Wifi size={13} />,
};
