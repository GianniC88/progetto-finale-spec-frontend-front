import { useEffect, useState } from "react";

export function useCartDetails(cart) {
  const [dettagli, setDettagli] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (cart.length === 0) {
      setDettagli([]);
      setLoading(false);
      return;
    }
    const uniqueIds = [...new Set(cart)];

    const fetchDetails = async () => {
      try {
        const prodotti = await Promise.all(
          uniqueIds.map(async (id) => {
            try {
              const res = await fetch(`${apiUrl}/products/${id}`);
              if (!res.ok) {
                throw new Error(`Errore HTTP prodotto: ${res.status}`);
              }
              const data = await res.json();
              return data.product || data;
            } catch {
              return null;
            }
          })
        );
        setDettagli(prodotti.filter(Boolean));
      } catch (error) {
        setDettagli([]);
        console.error("Errore nel caricamento dei dettagli carrello:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [cart]);

  return { dettagli, loading };
}
