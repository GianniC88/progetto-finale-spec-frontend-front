import React from "react";

export function SpicinessPeppers({ spiciness }) {
  const n = Number(spiciness);
  if (!n || Number.isNaN(n)) return "-";

  return (
    <>
      {[...Array(n)].map((_, i) => (
        <span key={i} role="img" aria-label="peperoncino">
          🌶️
        </span>
      ))}
    </>
  );
}

// compatibilità: alcuni file importano ancora "useSpicinessPeppers"
export function useSpicinessPeppers(spiciness) {
  return <SpicinessPeppers spiciness={spiciness} />;
}
