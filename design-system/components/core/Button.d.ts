import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual weight. `primary` is the single gold CTA per screen. */
  variant?: "primary" | "complete" | "mini" | "ghost" | "danger";
  /** Control height. `lg` for the hero CTA, `sm` for inline mini actions. */
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  /** Optional leading glyph (emoji or unicode icon). */
  icon?: React.ReactNode;
  /** Stretch to the container width (used for primary CTAs & complete buttons). */
  fullWidth?: boolean;
  children?: React.ReactNode;
}

/**
 * The brand's action primitive — gold for the one decisive action,
 * quieter outlines for everything else.
 *
 * @startingPoint section="Core" subtitle="Gold CTA, complete, mini, ghost & danger buttons" viewport="700x150"
 */
export function Button(props: ButtonProps): JSX.Element;
