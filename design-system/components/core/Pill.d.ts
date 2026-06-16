import * as React from "react";

export interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Tint. `neutral` for counts; `gold`/`green`/`violet`/`danger` for tagged state. */
  tone?: "neutral" | "gold" | "green" | "violet" | "danger";
  /** Optional leading glyph. */
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * Small uppercase chip for counts, tiers and status tags.
 */
export function Pill(props: PillProps): JSX.Element;
