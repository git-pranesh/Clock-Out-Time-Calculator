import { useState } from "react";
import { calculateHoursBetween } from "@/lib/calculations";

export function HoursBetweenCalculator() {
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");

  const parseTime = (t: string) => {
    const parts = t.split(":");
    if (parts.length < 2) return null;
    return { hour: parseInt(parts[0], 10), minute: parseInt(parts[1], 10) };
  };

  const start = parseTime(startTime);
  const end = parseTime(endTime);

  const result =
    start && end
      ? calculateHoursBetween(start.hour, start.minute, end.hour, end.minute)
      : null;

  const isOvernight = start && end && end.hour * 60 + end.minute <= start.hour * 60 + start.minute;

  return (
    <div className="bg-card border border-card-border rounded-xl shadow-sm overflow-hidden" data-testid="hours-between-calculator">
      <div className="px-6 py-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Hours Between Two Times</h3>
        <p className="text-sm text-muted-foreground mt-0.5">Know your start and end — find out how long you worked</p>
      </div>

      {/* Result */}
      <div className="px-6 py-4 bg-muted/30 border-b border-border flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Total time worked</p>
          {result ? (
            <p className="text-2xl font-bold text-foreground" data-testid="result-hours-between">
              {result.hours}h {result.minutes > 0 ? `${result.minutes}m` : ""}
            </p>
          ) : (
            <p className="text-2xl font-bold text-muted-foreground">—</p>
          )}
        </div>
        {isOvernight && (
          <span className="text-xs px-2 py-1 bg-accent/10 text-accent border border-accent/30 rounded-full" data-testid="label-overnight">
            Overnight shift
          </span>
        )}
      </div>

      <div className="px-6 py-5 grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="hb-start" className="block text-sm font-medium text-foreground mb-1.5">
            Start Time
          </label>
          <input
            id="hb-start"
            type="time"
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
            className="w-full h-11 px-3 rounded-lg border border-input bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-ring"
            data-testid="input-hb-start"
          />
        </div>
        <div>
          <label htmlFor="hb-end" className="block text-sm font-medium text-foreground mb-1.5">
            End Time
          </label>
          <input
            id="hb-end"
            type="time"
            value={endTime}
            onChange={e => setEndTime(e.target.value)}
            className="w-full h-11 px-3 rounded-lg border border-input bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-ring"
            data-testid="input-hb-end"
          />
        </div>
      </div>
    </div>
  );
}
