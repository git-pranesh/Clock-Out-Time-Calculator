import { useState } from "react";
import { calculateHoursBetween } from "@/lib/calculations";
import { Plus, Trash2 } from "lucide-react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface DayEntry {
  id: number;
  day: string;
  start: string;
  end: string;
  breakMins: number;
  enabled: boolean;
}

const defaultEntries: DayEntry[] = DAYS.slice(0, 5).map((day, i) => ({
  id: i,
  day,
  start: "09:00",
  end: "17:00",
  breakMins: 0,
  enabled: true,
}));

function parseDayHours(entry: DayEntry): number {
  if (!entry.enabled || !entry.start || !entry.end) return 0;
  const [sh, sm] = entry.start.split(":").map(Number);
  const [eh, em] = entry.end.split(":").map(Number);
  if (isNaN(sh) || isNaN(sm) || isNaN(eh) || isNaN(em)) return 0;
  const result = calculateHoursBetween(sh, sm, eh, em);
  const paid = result.totalMinutes - entry.breakMins;
  return Math.max(0, paid);
}

export function TimecardCalculator() {
  const [entries, setEntries] = useState<DayEntry[]>(defaultEntries);
  const nextId = entries.length;

  const update = (id: number, field: keyof DayEntry, value: string | number | boolean) => {
    setEntries(prev => prev.map(e => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const addDay = () => {
    const used = entries.map(e => e.day);
    const available = DAYS.find(d => !used.includes(d)) ?? "Day";
    setEntries(prev => [
      ...prev,
      { id: nextId, day: available, start: "09:00", end: "17:00", breakMins: 0, enabled: true },
    ]);
  };

  const removeDay = (id: number) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  const enabledEntries = entries.filter(e => e.enabled);
  const dailyMinutes = enabledEntries.map(parseDayHours);
  const totalMinutes = dailyMinutes.reduce((a, b) => a + b, 0);
  const totalHours = totalMinutes / 60;

  const regularMinutes = Math.min(totalMinutes, 40 * 60);
  const otMinutes = totalMinutes > 40 * 60 ? Math.min(totalMinutes - 40 * 60, 20 * 60) : 0;
  const dtMinutes = totalMinutes > 60 * 60 ? totalMinutes - 60 * 60 : 0;

  const fmtMins = (m: number) => {
    const h = Math.floor(m / 60);
    const min = m % 60;
    return min > 0 ? `${h}h ${min}m` : `${h}h`;
  };

  return (
    <div className="bg-card border border-card-border rounded-xl shadow-sm overflow-hidden" data-testid="timecard-calculator">
      <div className="px-6 py-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Weekly Timecard Calculator</h3>
        <p className="text-sm text-muted-foreground mt-0.5">Track up to 7 days of work hours</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="text-left px-4 py-2 font-medium text-muted-foreground w-28">Day</th>
              <th className="text-left px-4 py-2 font-medium text-muted-foreground">Start</th>
              <th className="text-left px-4 py-2 font-medium text-muted-foreground">End</th>
              <th className="text-left px-4 py-2 font-medium text-muted-foreground hidden sm:table-cell">Break</th>
              <th className="text-right px-4 py-2 font-medium text-muted-foreground">Hours</th>
              <th className="px-2 py-2 w-8"></th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, idx) => {
              const dayMins = entry.enabled ? parseDayHours(entry) : 0;
              const dayHours = dayMins / 60;
              return (
                <tr key={entry.id} className="border-b border-border last:border-0" data-testid={`timecard-row-${idx}`}>
                  <td className="px-4 py-2">
                    <select
                      value={entry.day}
                      onChange={e => update(entry.id, "day", e.target.value)}
                      className="w-full h-9 px-2 rounded border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                      data-testid={`select-day-${idx}`}
                    >
                      {DAYS.map(d => <option key={d} value={d}>{d.slice(0, 3)}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="time"
                      value={entry.start}
                      onChange={e => update(entry.id, "start", e.target.value)}
                      className="w-full h-9 px-2 rounded border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                      data-testid={`input-start-${idx}`}
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="time"
                      value={entry.end}
                      onChange={e => update(entry.id, "end", e.target.value)}
                      className="w-full h-9 px-2 rounded border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                      data-testid={`input-end-${idx}`}
                    />
                  </td>
                  <td className="px-4 py-2 hidden sm:table-cell">
                    <select
                      value={entry.breakMins}
                      onChange={e => update(entry.id, "breakMins", parseInt(e.target.value, 10))}
                      className="w-full h-9 px-2 rounded border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                      data-testid={`select-break-${idx}`}
                    >
                      <option value="0">None</option>
                      <option value="15">15m</option>
                      <option value="30">30m</option>
                      <option value="45">45m</option>
                      <option value="60">60m</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <span className={`font-medium tabular-nums ${dayHours > 8 ? "text-orange-500" : "text-foreground"}`} data-testid={`result-day-hours-${idx}`}>
                      {entry.enabled ? fmtMins(dayMins) : "—"}
                    </span>
                  </td>
                  <td className="px-2 py-2">
                    <button
                      onClick={() => removeDay(entry.id)}
                      className="p-1.5 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      aria-label={`Remove ${entry.day}`}
                      data-testid={`button-remove-day-${idx}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {entries.length < 7 && (
        <div className="px-6 py-3 border-t border-border">
          <button
            onClick={addDay}
            className="flex items-center gap-1.5 text-sm text-accent hover:text-accent/80 font-medium transition-colors"
            data-testid="button-add-day"
          >
            <Plus className="w-4 h-4" />
            Add day
          </button>
        </div>
      )}

      {/* Summary */}
      <div className="border-t border-border bg-muted/30 px-6 py-4" data-testid="timecard-summary">
        <div className="flex flex-wrap gap-4 justify-between items-start">
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Total Hours</p>
            <p className="text-2xl font-bold text-foreground tabular-nums" data-testid="result-total-hours">
              {totalHours.toFixed(2)}h
            </p>
          </div>
          <div className="flex gap-4 text-sm">
            <div>
              <p className="text-muted-foreground text-xs">Regular</p>
              <p className="font-semibold text-foreground" data-testid="result-regular-hours">{fmtMins(regularMinutes)}</p>
            </div>
            {otMinutes > 0 && (
              <div>
                <p className="text-orange-500 text-xs">Overtime</p>
                <p className="font-semibold text-orange-500" data-testid="result-ot-hours">{fmtMins(otMinutes)}</p>
              </div>
            )}
            {dtMinutes > 0 && (
              <div>
                <p className="text-red-500 text-xs">Double Time</p>
                <p className="font-semibold text-red-500" data-testid="result-dt-hours">{fmtMins(dtMinutes)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
