import React from "react";

export function useSpicinessPeppers(spiciness) {
  if (!spiciness || isNaN(spiciness)) return "-";
  return [...Array(Number(spiciness))].map((_, i) => (
    <span key={i} role="img" aria-label="peperoncino">
      🌶️
    </span>
  ));
}
