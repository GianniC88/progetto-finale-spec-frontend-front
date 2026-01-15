import { useEffect, useState } from "react";

// Hook “di dominio”: risolve la lista preferiti in dettagli prodotto, con fetch parallele e tolleranza a errori per-item.
export default function useFetchFavorites(favoriteList) {
  const [prodotti, setProdotti] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const apiUrl = import.meta.env.VITE_API_URL;

      // Scelta: input permissivo (accetta solo id coerenti e ignora valori sporchi).
      const validIds = Array.isArray(favoriteList)
        ? favoriteList.filter(
            (id) => typeof id === "string" || typeof id === "number"
          )
        : [];
      if (validIds.length === 0) {
        setProdotti([]);
        setLoading(false);
        return;
      }
      try {
        // Scelta: richieste in parallelo (Promise.all) e risultato filtrato dai fallimenti.
        const prodotti = await Promise.all(
          validIds.map(async (id) => {
            try {
              const res = await fetch(`${apiUrl}/products/${id}`);
              if (!res.ok) return null;
              const data = await res.json();
              return data.product || data;
            } catch {
              return null;
            }
          })
        );
        setProdotti(prodotti.filter(Boolean));
      } catch (error) {
        console.error("Errore nel caricamento dei preferiti:", error);
        setProdotti([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [favoriteList]);

  return { prodotti, loading };
}
