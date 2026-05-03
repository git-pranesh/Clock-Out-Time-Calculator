import { useState, useEffect } from "react";
import { Clock, Sun, Moon } from "lucide-react";
import {
  calculateClockOut,
  SHIFT_OPTIONS,
  BREAK_OPTIONS,
  minutesToHoursLabel,
} from "@/lib/calculations";

interface ClockOutCalculatorProps {
  defaultShiftHours?: number;
  defaultStartHour?: number;
  autoCalculate?: boolean;
}

function padTwo(n: number) {
  return n.toString().padStart(2, "0");
}

function currentTimeString() {
  const now = new Date();
  return `${padTwo(now.getHours())}:${padTwo(now.getMinutes())}`;
}

export function ClockOutCalculator({
  defaultShiftHours = 8,
  defaultStartHour,
  autoCalculate = false,
}: ClockOutCalculatorProps) {
  const defaultShiftMinutes = defaultShiftHours * 60;
  const closestShift =
    SHIFT_OPTIONS.find(o => o.value === defaultShiftMinutes) ?? SHIFT_OPTIONS[7];

  const [use24h, setUse24h] = useState(false);
  const [startTime, setStartTime] = useState(() => {
    if (defaultStartHour !== undefined) {
      return `${padTwo(defaultStartHour)}:00`;
    }
    if (autoCalculate) return currentTimeString();
    return "09:00";
  });
  const [shiftValue, setShiftValue] = useState(closestShift.value.toString());
  const [customShiftHours, setCustomShiftHours] = useState("8");
  const [customShiftMins, setCustomShiftMins] = useState("0");
  const [breakValue, setBreakValue] = useState("0");
  const [customBreakMins, setCustomBreakMins] = useState("0");

  const isCustomShift = shiftValue === "-1";
  const isCustomBreak = breakValue === "-1";

  const getShiftMinutes = () => {
    if (isCustomShift) {
      return (parseInt(customShiftHours, 10) || 0) * 60 + (parseInt(customShiftMins, 10) || 0);
    }
    return parseInt(shiftValue, 10);
  };

  const getBreakMinutes = () => {
    if (isCustomBreak) return parseInt(customBreakMins, 10) || 0;
    return parseInt(breakValue, 10);
  };

  const parseStart = () => {
    if (!startTime) return null;
    const parts = startTime.split(":");
    if (parts.length < 2) return null;
    return { hour: parseInt(parts[0], 10), minute: parseInt(parts[1], 10) };
  };

  const start = parseStart();
  const shiftMinutes = getShiftMinutes();
  const rawBreakMinutes = getBreakMinutes();
  // Clamp break to never exceed shift length (an unpaid break can't be longer than the shift itself).
  const MAX_BREAK_CAP = 240; // 4 hours max for any single break.
  const breakMinutes = Math.min(Math.max(0, rawBreakMinutes), shiftMinutes, MAX_BREAK_CAP);
  const breakWasClamped = rawBreakMinutes > breakMinutes;

  const result =
    start && shiftMinutes > 0
      ? calculateClockOut(start.hour, start.minute, shiftMinutes, breakMinutes)
      : null;

  useEffect(() => {
    if (!autoCalculate) return;
    const interval = setInterval(() => {
      setStartTime(currentTimeString());
    }, 60000);
    return () => clearInterval(interval);
  }, [autoCalculate]);

  const paidHoursLabel = result
    ? `${result.paidHours}h ${result.paidMinutes > 0 ? result.paidMinutes + "m" : ""}`.trim()
    : "—";

  const overtimeLabel =
    result && result.overtimeMinutes > 0
      ? `${minutesToHoursLabel(result.overtimeMinutes)} OT`
      : null;

  const doubleTimeLabel =
    result && result.doubleTimeMinutes > 0
      ? `${minutesToHoursLabel(result.doubleTimeMinutes)} DT`
      : null;

  return (
    <div className="bg-card border border-card-border rounded-xl shadow-sm overflow-hidden" data-testid="clock-out-calculator">
      {/* Result display */}
      <div className="bg-primary px-6 py-6 text-center">
        <p className="text-primary-foreground/70 text-sm font-medium mb-1">
          You get off at
        </p>
        {result ? (
          <>
            <p
              className="text-5xl sm:text-6xl font-bold text-white tracking-tight leading-none"
              data-testid="result-clockout-12h"
            >
              {use24h ? result.display24h : result.display12h}
            </p>
            {result.crossesMidnight && (
              <span className="inline-block mt-2 px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium" data-testid="label-next-day">
                +1 day
              </span>
            )}
            {!use24h && (
              <p className="text-primary-foreground/50 text-sm mt-1" data-testid="result-clockout-24h">
                {result.display24h} (24h)
              </p>
            )}
          </>
        ) : (
          <p className="text-4xl font-bold text-white/40">—:——</p>
        )}
      </div>

      {/* Stats row */}
      {result && (
        <div className="grid grid-cols-3 divide-x divide-border border-b border-border" data-testid="result-stats">
          <div className="px-4 py-3 text-center">
            <p className="text-xs text-muted-foreground mb-0.5">Paid Hours</p>
            <p className="font-semibold text-foreground text-sm" data-testid="result-paid-hours">{paidHoursLabel}</p>
          </div>
          <div className="px-4 py-3 text-center">
            <p className="text-xs text-muted-foreground mb-0.5">Overtime</p>
            <p
              className={`font-semibold text-sm ${overtimeLabel ? "text-orange-500" : "text-muted-foreground"}`}
              data-testid="result-overtime"
            >
              {overtimeLabel ?? "None"}
            </p>
          </div>
          <div className="px-4 py-3 text-center">
            <p className="text-xs text-muted-foreground mb-0.5">Double Time</p>
            <p
              className={`font-semibold text-sm ${doubleTimeLabel ? "text-red-500" : "text-muted-foreground"}`}
              data-testid="result-doubletime"
            >
              {doubleTimeLabel ?? "None"}
            </p>
          </div>
        </div>
      )}

      {/* Inputs */}
      <div className="px-6 py-5 space-y-4">
        {/* Start time */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="start-time" className="text-sm font-medium text-foreground">
              Start Time
            </label>
            <button
              onClick={() => setUse24h(!use24h)}
              className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border border-border bg-muted hover:bg-accent/10 hover:border-accent hover:text-accent transition-colors"
              data-testid="button-toggle-24h"
              aria-label={use24h ? "Switch to 12-hour format" : "Switch to 24-hour format"}
            >
              {use24h ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3" />}
              {use24h ? "24h" : "12h"}
            </button>
          </div>
          <input
            id="start-time"
            type="time"
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
            className="w-full h-12 px-4 rounded-lg border border-input bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            data-testid="input-start-time"
          />
        </div>

        {/* Shift length */}
        <div>
          <label htmlFor="shift-length" className="block text-sm font-medium text-foreground mb-1.5">
            Shift Length <span className="text-muted-foreground font-normal">(paid hours)</span>
          </label>
          <select
            id="shift-length"
            value={shiftValue}
            onChange={e => setShiftValue(e.target.value)}
            className="w-full h-12 px-4 rounded-lg border border-input bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            data-testid="select-shift-length"
          >
            {SHIFT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value.toString()}>
                {opt.label}
              </option>
            ))}
          </select>
          {isCustomShift && (
            <div className="flex gap-2 mt-2">
              <div className="flex-1">
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={customShiftHours}
                  onChange={e => setCustomShiftHours(e.target.value)}
                  placeholder="Hours"
                  className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-ring"
                  data-testid="input-custom-shift-hours"
                />
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={customShiftMins}
                  onChange={e => setCustomShiftMins(e.target.value)}
                  placeholder="Minutes"
                  className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-ring"
                  data-testid="input-custom-shift-mins"
                />
              </div>
            </div>
          )}
        </div>

        {/* Break */}
        <div>
          <label htmlFor="break-duration" className="block text-sm font-medium text-foreground mb-1.5">
            Break Duration <span className="text-muted-foreground font-normal">(unpaid)</span>
          </label>
          <select
            id="break-duration"
            value={breakValue}
            onChange={e => setBreakValue(e.target.value)}
            className="w-full h-12 px-4 rounded-lg border border-input bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            data-testid="select-break-duration"
          >
            {BREAK_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value.toString()}>
                {opt.label}
              </option>
            ))}
          </select>
          {isCustomBreak && (
            <input
              type="number"
              min="0"
              max={Math.min(240, Math.max(0, shiftMinutes))}
              value={customBreakMins}
              onChange={e => setCustomBreakMins(e.target.value)}
              placeholder="Break minutes"
              className="w-full h-10 px-3 mt-2 rounded-lg border border-input bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-ring"
              data-testid="input-custom-break"
            />
          )}
          {breakWasClamped && (
            <p className="mt-1.5 text-xs text-orange-600" data-testid="break-clamp-warning">
              Break can't be longer than your shift — capped at {minutesToHoursLabel(breakMinutes)}.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
