import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** Left-rail accent color — usually an attribute hue. */
  accent?: string | null;
  /** Surface: lit `card`, recessed `panel`, or flat `well`. */
  tone?: "card" | "panel" | "well";
  /** Selected state — adds a 1px ring in the accent color. */
  active?: boolean;
  /** Dim the card (e.g. a completed quest). */
  faded?: boolean;
  /** Element to render as. Defaults to `article`. */
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
}

/**
 * Raised, gradient-faced container for quests, battles, NPCs and panels.
 *
 * @startingPoint section="Core" subtitle="Quest / battle / panel card surfaces with attribute rails" viewport="700x220"
 */
export function Card(props: CardProps): JSX.Element;
