import { createContext, useState, useEffect } from "react";
export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [favoriteList, setFavoriteList] = useState(() => {
    const saved = localStorage.getItem("favoriteList");
    return saved ? JSON.parse(saved) : [];
  });

  // Salva i preferiti su localStorage ogni volta che cambiano
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
    const saved = localStorage.getItem("cart");
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  });

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
    const saved = localStorage.getItem("compareList");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("compareList", JSON.stringify(compareList));
  }, [compareList]);
  const addToCompare = (id) => {
    setCompareList((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const removeFromCompare = (id) => {
    setCompareList((prev) => prev.filter((item) => item !== id));
  };

  const isCompared = (id) => compareList.includes(id);

  const clearCart = () => setCart([]);
  const clearFavorites = () => setFavoriteList([]);
  const clearCompare = () => setCompareList([]);
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
