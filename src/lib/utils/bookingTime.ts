// Booking times are always interpreted in the business timezone (Houston),
// regardless of the visitor's browser timezone or UTC.
export const BUSINESS_TIME_ZONE = "America/Chicago";

// One hour of lead time before a same-day slot can be booked.
const SAME_DAY_BUFFER_MINUTES = 60;

const getBusinessParts = (now: Date) => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: BUSINESS_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "00";
  return {
    date: `${get("year")}-${get("month")}-${get("day")}`,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
};

/** Today's date in Houston as "YYYY-MM-DD" (matches <input type="date"> values). */
export const getBusinessToday = (now: Date = new Date()): string =>
  getBusinessParts(now).date;

/** Converts a slot like "2:00 PM" to minutes since midnight. */
export const timeToMinutes = (timeStr: string): number => {
  const [time, period] = timeStr.split(" ");
  const [hoursStr, minutesStr] = time.split(":");
  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  if (period === "PM" && hours !== 12) hours += 12;
  else if (period === "AM" && hours === 12) hours = 0;

  return hours * 60 + minutes;
};

/** True when the slot is on today's Houston date and starts within the lead-time buffer. */
export const isSlotInPast = (
  slot: string,
  selectedDate: string,
  now: Date = new Date()
): boolean => {
  if (!selectedDate) return false;
  const { date, minutes } = getBusinessParts(now);
  if (selectedDate !== date) return false;
  return timeToMinutes(slot) <= minutes + SAME_DAY_BUFFER_MINUTES;
};

/** "2026-11-14" → "Saturday, November 14, 2026". Anchored at noon UTC so no timezone can shift the day. */
export const formatBookingDate = (date: string): string => {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00Z`));
};
