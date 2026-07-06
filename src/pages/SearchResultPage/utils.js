export const formatVND = (amount) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    amount,
  );

export const formatDate = (d) => {
  if (!d) return "";
  const date = new Date(d);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "short",
  });
};
