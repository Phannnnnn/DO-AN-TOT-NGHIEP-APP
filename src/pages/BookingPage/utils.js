import { format, parseISO } from "date-fns";
import { vi } from "date-fns/locale";

export const formatVND = (amount) =>
 new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
 amount,
 );

export const fmtDate = (d) =>
 d ? format(parseISO(d), "dd MMM yyyy", { locale: vi }) : "";
