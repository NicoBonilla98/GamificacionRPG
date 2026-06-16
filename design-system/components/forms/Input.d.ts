import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Heavy sans caption above the field. */
  label?: string | null;
  /** Optional helper line below the field. */
  hint?: string | null;
}

/**
 * Deep recessed text field — ink-well that lights its border gold on focus.
 */
export function Input(props: InputProps): JSX.Element;
