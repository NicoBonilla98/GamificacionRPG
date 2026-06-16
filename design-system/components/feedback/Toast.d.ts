import * as React from "react";

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Event color — usually the attribute hue, or gold/green/danger. */
  color?: string;
  /** Leading glyph (⭐ level, ✦ passive, 🏆 boss, 💤 rest…). */
  icon?: React.ReactNode;
  /** Visible state — drives the fade/slide transition. */
  show?: boolean;
  children?: React.ReactNode;
}

/**
 * The "pop notification" that celebrates every gain — level-ups, stat
 * bumps, drops, defeats.
 */
export function Toast(props: ToastProps): JSX.Element;
