import * as React from "react";

export interface AttributeMeterProps extends React.HTMLAttributes<HTMLElement> {
  /** Which stat this row represents. */
  attr?: "STR" | "INT" | "VIT" | "DIS" | "FOC";
  /** Current total value. */
  value?: number;
  /** Scale max for the meter fill. */
  max?: number;
  /** Equipment bonus folded into the value (shown as "+N equipo"). */
  bonus?: number;
  /** Next passive threshold (10/25/50/100), or null at cap. */
  next?: number | null;
}

/**
 * Character-screen stat row — labeled meter in the attribute hue with a
 * "→ next threshold" hint.
 */
export function AttributeMeter(props: AttributeMeterProps): JSX.Element;
