import { useEffect, useState } from "react";

function useFetchCompareProducts(compareList) {
  const [prodotti, setProdotti] = useState([]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;

    // Normalizza l'input: accetta solo id primitivi (string/number) prima delle chiamate HTTP.
    const validIds = Array.isArray(compareList)
      ? compareList.filter(
          (id) => typeof id === "string" || typeof id === "number"
        )
      : [];
    if (validIds.length === 0) {
      setProdotti([]);
      return;
    }

    const fetchProducts = async () => {
      try {
        // Richieste concorrenti; Promise.all restituisce i risultati nell'ordine di validIds.
        const prodotti = await Promise.all(
          validIds.map(async (id) => {
            try {
              const res = await fetch(`${apiUrl}/products/${id}`);
              if (!res.ok) {
                throw new Error(`Errore HTTP prodotto: ${res.status}`);
              }
              const data = await res.json();

              // Compatibilità API: alcuni endpoint rispondono con { product: ... }.
              return data.product || data;
            } catch (error) {
              // Se un id fallisce, viene escluso senza interrompere il caricamento degli altri.
              console.error(error);
              return null;
            }
          })
        );

        setProdotti(prodotti.filter(Boolean));
      } catch (error) {
        setProdotti([]);
        console.error(
          "Errore nel caricamento dei prodotti da confrontare:",
          error
        );
      }
    };

    fetchProducts();
  }, [compareList]);

  return prodotti;
}

export default useFetchCompareProducts;
