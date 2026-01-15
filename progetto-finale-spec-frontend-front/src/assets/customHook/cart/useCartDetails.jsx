import { useEffect, useState } from "react";

export function useCartDetails(cart) {
  const [dettagli, setDettagli] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;

    // Caso base: carrello vuoto → nessuna chiamata HTTP.
    if (cart.length === 0) {
      setDettagli([]);
      setLoading(false);
      return;
    }

    // Deduplica id: `cart` può contenere duplicati (quantità), ma il fetch dei dettagli serve una sola volta per id.
    const uniqueIds = [...new Set(cart)];

    const fetchDetails = async () => {
      try {
        // Richieste concorrenti; Promise.all restituisce i risultati nell'ordine di uniqueIds.
        const prodotti = await Promise.all(
          uniqueIds.map(async (id) => {
            try {
              const res = await fetch(`${apiUrl}/products/${id}`);
              if (!res.ok) {
                throw new Error(`Errore HTTP prodotto: ${res.status}`);
              }
              const data = await res.json();

              // Compatibilità API: alcuni endpoint rispondono con { product: ... }.
              return data.product || data;
            } catch {
              // Se un id fallisce, viene escluso senza interrompere il caricamento degli altri.
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
