import { dateStamp } from "@/lib/dates";

it("formats dates as DD-MM-YYYY", () => {
  expect(dateStamp(new Date(2026, 0, 5))).toBe("05-01-2026");
  expect(dateStamp(new Date(2026, 11, 31))).toBe("31-12-2026");
});
