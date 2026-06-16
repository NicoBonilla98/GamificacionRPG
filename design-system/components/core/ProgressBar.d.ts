import * as React from "react";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  /** Fill preset: `xp` (gold), `hp` (red), `attr`/`timer` (green→gold). */
  kind?: "xp" | "hp" | "attr" | "timer";
  /** Override the fill with a single color (e.g. an attribute hue). */
  color?: string | null;
  /** Override track height (defaults per kind). */
  height?: string | null;
  /** Optional centered overlay label (used on HP tracks: "820 / 1200 PV"). */
  label?: React.ReactNode;
}

/**
 * Inset, pill-rounded progress track — XP, HP, attribute meters, timers.
 */
export function ProgressBar(props: ProgressBarProps): JSX.Element;
