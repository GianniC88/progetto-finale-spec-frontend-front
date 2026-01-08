import { useEffect, useState } from "react";

function useFetchProdotti(debouncedSearch, category, sort) {
  const [prodotti, setProdotti] = useState([]);

  useEffect(() => {
    const fetchProdotti = async () => {
      const apiUrl = import.meta.env.VITE_API_URL;
      let url = `${apiUrl}/products?`;
      if (debouncedSearch)
        url += `search=${encodeURIComponent(debouncedSearch)}&`;
      if (category) url += `category=${encodeURIComponent(category)}&`;

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Errore nella risposta");
        const data = await res.json();
        const all = data.products || data;
        let ordinati = [...all];
        if (sort === "title-asc")
          ordinati.sort((a, b) => a.title.localeCompare(b.title));
        if (sort === "title-desc")
          ordinati.sort((a, b) => b.title.localeCompare(a.title));
        if (sort === "category-asc")
          ordinati.sort((a, b) => a.category.localeCompare(b.category));
        if (sort === "category-desc")
          ordinati.sort((a, b) => b.category.localeCompare(a.category));
        setProdotti(ordinati);
      } catch (error) {
        console.error("Errore fetch prodotti:", error);
        setProdotti([]);
      }
    };
    fetchProdotti();
  }, [debouncedSearch, category, sort]);

  return prodotti;
}

export default useFetchProdotti;
