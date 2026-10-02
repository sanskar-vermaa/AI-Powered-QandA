// Dates are stored as DD-MM-YYYY strings for compatibility with existing rows.
export function dateStamp(date = new Date()) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  return `${dd}-${mm}-${date.getFullYear()}`;
}
