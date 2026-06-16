import * as React from "react";

export interface RarityTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Loot tier. */
  rarity?: "common" | "rare" | "epic";
}

/**
 * Loot-tier label — common (muted), rare (INT blue), epic (FOC violet).
 */
export function RarityTag(props: RarityTagProps): JSX.Element;
