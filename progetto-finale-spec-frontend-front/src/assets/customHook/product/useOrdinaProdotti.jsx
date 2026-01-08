import { useMemo } from "react";

export default function useOrdinaProdotti(prodotti, sort) {
  return useMemo(() => {
    let ordinati = [...prodotti];
    if (sort === "title-asc")
      ordinati.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "title-desc")
      ordinati.sort((a, b) => b.title.localeCompare(a.title));
    if (sort === "category-asc")
      ordinati.sort((a, b) => a.category.localeCompare(b.category));
    if (sort === "category-desc")
      ordinati.sort((a, b) => b.category.localeCompare(a.category));
    return ordinati;
  }, [prodotti, sort]);
}
