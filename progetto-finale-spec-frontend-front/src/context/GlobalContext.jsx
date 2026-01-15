import { createContext, useState, useEffect } from "react";
export const GlobalContext = createContext();

// Context applicativo: stato condiviso (preferiti, carrello, confronto) + persistenza su localStorage.
// Scelta: “single source of truth” lato client per evitare prop drilling.
export function GlobalProvider({ children }) {
  const [favoriteList, setFavoriteList] = useState(() => {
    // Lazy init: legge localStorage una sola volta (non ad ogni render).
    const saved = localStorage.getItem("favoriteList");
    return saved ? JSON.parse(saved) : [];
  });

  // Persistenza: sincronizza i preferiti senza dipendere dal backend.
  useEffect(() => {
    localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
  }, [favoriteList]);

  const toggleFavorite = (id) => {
    setFavoriteList((list) =>
      list.includes(id) ? list.filter((x) => x !== id) : [...list, id]
    );
  };

  const isFavorite = (id) => favoriteList.includes(id);

  const [cart, setCart] = useState(() => {
    // Normalizzazione: garantisce che `cart` sia sempre un array.
    const saved = localStorage.getItem("cart");
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  });

  // Scelta di modello: carrello come lista di id (duplicati = quantità).
  // Pro: gestione quantità semplice; Contro: serve deduplica quando si fetchano i dettagli.
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const isInCart = (id) => (Array.isArray(cart) ? cart.includes(id) : false);

  const addToCart = (id) => {
    setCart((list) => [...list, id]);
  };

  const removeFromCart = (id) => {
    setCart((list) => list.filter((x) => x !== id));
  };

  const decreaseFromCart = (id) => {
    setCart((list) => {
      // Scelta: rimuove una sola occorrenza (quantità -1) mantenendo immutabilità.
      const index = list.lastIndexOf(id);
      if (index !== -1) {
        const newList = [...list];
        newList.splice(index, 1);
        return newList;
      }
      return list;
    });
  };

  const [compareList, setCompareList] = useState(() => {
    // Lazy init: persistenza confronto.
    const saved = localStorage.getItem("compareList");
    return saved ? JSON.parse(saved) : [];
  });

  // Lista confronto: set “logico” (niente duplicati) con persistenza locale.
  useEffect(() => {
    localStorage.setItem("compareList", JSON.stringify(compareList));
  }, [compareList]);
  const addToCompare = (id) => {
    // Invariante: evita duplicati nella lista confronto.
    setCompareList((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const removeFromCompare = (id) => {
    setCompareList((prev) => prev.filter((item) => item !== id));
  };

  const isCompared = (id) => compareList.includes(id);

  const clearCart = () => setCart([]);
  const clearFavorites = () => setFavoriteList([]);
  const clearCompare = () => setCompareList([]);

  // API del provider: espone solo operazioni “intenzionali” (toggle/add/remove/clear).
  return (
    <GlobalContext.Provider
      value={{
        favoriteList,
        toggleFavorite,
        isFavorite,
        clearFavorites,
        cart,
        addToCart,
        isInCart,
        removeFromCart,
        decreaseFromCart,
        clearCart,
        compareList,
        setCompareList,
        addToCompare,
        removeFromCompare,
        isCompared,
        clearCompare,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
