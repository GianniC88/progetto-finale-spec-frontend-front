import { useEffect, useState } from "react";

export default function useFetchDetail(id) {
  const [prodotto, setProdotto] = useState(null);
  const [errore, setErrore] = useState(null);

  useEffect(() => {
    const fetchProdotto = async () => {
      if (!id) {
        const saved = localStorage.getItem("lastProduct");
        if (saved) setProdotto(JSON.parse(saved));
        return;
      }
      setErrore(null);
      setProdotto(null);
      const apiUrl = import.meta.env.VITE_API_URL;
      try {
        const res = await fetch(`${apiUrl}/products/${id}`);
        if (!res.ok) throw new Error("Prodotto non trovato");
        const data = await res.json();
        if (data && data.success && data.product) {
          setProdotto(data.product);
          localStorage.setItem("lastProduct", JSON.stringify(data.product));
        } else {
          setProdotto(null);
          setErrore("Prodotto non trovato");
        }
      } catch {
        setProdotto(null);
        setErrore("Prodotto non trovato");
      }
    };
    fetchProdotto();
  }, [id]);

  return { prodotto, errore };
}
