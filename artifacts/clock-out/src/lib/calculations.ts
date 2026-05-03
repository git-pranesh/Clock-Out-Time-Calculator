export interface TimeResult {
  hours: number;
  minutes: number;
  totalMinutes: number;
}

export interface ClockOutResult {
  clockOutHour: number;
  clockOutMinute: number;
  crossesMidnight: boolean;
  paidHours: number;
  paidMinutes: number;
  overtimeMinutes: number;
  doubleTimeMinutes: number;
  display12h: string;
  display24h: string;
}

export function parseTimeString(timeStr: string): { hour: number; minute: number } | null {
  if (!timeStr) return null;
  const parts = timeStr.split(":");
  if (parts.length < 2) return null;
  const hour = parseInt(parts[0], 10);
  const minute = parseInt(parts[1], 10);
  if (isNaN(hour) || isNaN(minute)) return null;
  return { hour, minute };
}

export function formatHour12(hour: number, minute: number): string {
  const period = hour >= 12 ? "PM" : "AM";
  const h = hour % 12 === 0 ? 12 : hour % 12;
  const m = minute.toString().padStart(2, "0");
  return `${h}:${m} ${period}`;
}

export function formatHour24(hour: number, minute: number): string {
  return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
}

export function calculateClockOut(
  startHour: number,
  startMinute: number,
  paidMinutes: number,
  breakMinutes: number
): ClockOutResult {
  // Semantics: `paidMinutes` is the number of hours the worker is actually paid for
  // (i.e., the "shift length" they think of). Total time at work = paid + unpaid break.
  // Clock-out time = start + paid + break.
  const safeBreak = Math.max(0, breakMinutes);
  const totalAtWorkMinutes = paidMinutes + safeBreak;
  const paidHours = Math.floor(paidMinutes / 60);
  const paidMins = paidMinutes % 60;

  const startTotalMinutes = startHour * 60 + startMinute;
  const endTotalMinutes = startTotalMinutes + totalAtWorkMinutes;
  const crossesMidnight = endTotalMinutes >= 1440;

  const clockOutTotal = ((endTotalMinutes % 1440) + 1440) % 1440;
  const clockOutHour = Math.floor(clockOutTotal / 60);
  const clockOutMinute = clockOutTotal % 60;

  const overtimeThresh = 8 * 60;
  const doubleTimeThresh = 12 * 60;
  const overtimeMinutes = paidMinutes > overtimeThresh
    ? Math.min(paidMinutes - overtimeThresh, doubleTimeThresh - overtimeThresh)
    : 0;
  const doubleTimeMinutes = paidMinutes > doubleTimeThresh
    ? paidMinutes - doubleTimeThresh
    : 0;

  return {
    clockOutHour,
    clockOutMinute,
    crossesMidnight,
    paidHours,
    paidMinutes: paidMins,
    overtimeMinutes,
    doubleTimeMinutes,
    display12h: formatHour12(clockOutHour, clockOutMinute),
    display24h: formatHour24(clockOutHour, clockOutMinute),
  };
}

export function calculateHoursBetween(
  startHour: number,
  startMinute: number,
  endHour: number,
  endMinute: number
): { hours: number; minutes: number; totalMinutes: number } {
  let startTotal = startHour * 60 + startMinute;
  let endTotal = endHour * 60 + endMinute;
  if (endTotal <= startTotal) endTotal += 1440;
  const diff = endTotal - startTotal;
  return {
    hours: Math.floor(diff / 60),
    minutes: diff % 60,
    totalMinutes: diff,
  };
}

export const SHIFT_OPTIONS = [
  { label: "4 hours", value: 240 },
  { label: "4.5 hours", value: 270 },
  { label: "5 hours", value: 300 },
  { label: "6 hours", value: 360 },
  { label: "6.5 hours", value: 390 },
  { label: "7 hours", value: 420 },
  { label: "7.5 hours", value: 450 },
  { label: "8 hours", value: 480 },
  { label: "8.5 hours", value: 510 },
  { label: "9 hours", value: 540 },
  { label: "10 hours", value: 600 },
  { label: "10.5 hours", value: 630 },
  { label: "11 hours", value: 660 },
  { label: "12 hours", value: 720 },
  { label: "Custom", value: -1 },
];

export const BREAK_OPTIONS = [
  { label: "No break", value: 0 },
  { label: "15 minutes", value: 15 },
  { label: "20 minutes", value: 20 },
  { label: "30 minutes", value: 30 },
  { label: "45 minutes", value: 45 },
  { label: "60 minutes", value: 60 },
  { label: "Custom", value: -1 },
];

export function minutesToHoursLabel(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export function calculateWeeklyOvertimePay(
  hoursWorked: number,
  hourlyRate: number,
  state: string
): { regularHours: number; otHours: number; dtHours: number; regularPay: number; otPay: number; dtPay: number; totalPay: number } {
  const regularThresh = 40;
  const otThresh = state === "CA" ? 60 : 60;

  const regularHours = Math.min(hoursWorked, regularThresh);
  const otHoursRaw = hoursWorked > regularThresh ? Math.min(hoursWorked - regularThresh, otThresh - regularThresh) : 0;
  const dtHours = hoursWorked > otThresh ? hoursWorked - otThresh : 0;

  const regularPay = regularHours * hourlyRate;
  const otPay = otHoursRaw * hourlyRate * 1.5;
  const dtPay = dtHours * hourlyRate * 2;

  return {
    regularHours,
    otHours: otHoursRaw,
    dtHours,
    regularPay,
    otPay,
    dtPay,
    totalPay: regularPay + otPay + dtPay,
  };
}
