import { useEffect, useState } from "react";

export default function useFetchCategorie() {
  const [categorie, setCategorie] = useState([]);

  useEffect(() => {
    const fetchCategorie = async () => {
      const apiUrl = import.meta.env.VITE_API_URL;
      try {
        const res = await fetch(`${apiUrl}/products`);
        if (!res.ok) throw new Error("Errore nella risposta");
        const data = await res.json();
        const all = data.products || data;
        setCategorie(
          Array.from(new Set(all.map((p) => p.category))).filter(Boolean)
        );
      } catch (error) {
        console.error("Errore nel caricamento delle categorie:", error);
        setCategorie([]);
      }
    };
    fetchCategorie();
  }, []);

  return categorie;
}
