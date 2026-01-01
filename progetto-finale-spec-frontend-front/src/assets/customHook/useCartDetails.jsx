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
    Promise.all(
      uniqueIds.map((id) =>
        fetch(`${apiUrl}/products/${id}`)
          .then((res) => res.json())
          .then((data) => data.product || data)
      )
    ).then((prodotti) => {
      setDettagli(prodotti);
      setLoading(false);
    });
  }, [cart]);

  return { dettagli, loading };
}
