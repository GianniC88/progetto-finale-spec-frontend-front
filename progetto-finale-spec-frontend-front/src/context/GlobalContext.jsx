import { createContext, useState, useEffect } from "react";
const { VITE_API_URL } = import.meta.env;
export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
	const [prodotti, setProdotti] = useState([]);
	const [favoriteList, setFavoriteList] = useState(() => {
		const saved = localStorage.getItem("favoriteList");
		return saved ? JSON.parse(saved) : [];
	});

	useEffect(() => {
		fetch(`${VITE_API_URL}/products`)
			.then(res => res.json())
			.then(data => {
				console.log("Risposta fetch prodotti:", data);
				setProdotti(data);
			})
			.catch(error => console.error(error));
	}, []);

	// Salva i preferiti su localStorage ogni volta che cambiano
	useEffect(() => {
		localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
	}, [favoriteList]);

	const toggleFavorite = id => {
		setFavoriteList(list =>
			list.includes(id) ? list.filter(x => x !== id) : [...list, id]
		);
	};

	const isFavorite = id => favoriteList.includes(id);

	const [cart, setCart] = useState(() => {
		const saved = localStorage.getItem("cart");
		const parsed = saved ? JSON.parse(saved) : [];
		return Array.isArray(parsed) ? parsed : [];
	});

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cart));
	}, [cart]);

	const isInCart = id => (Array.isArray(cart) ? cart.includes(id) : false);

	const addToCart = id => {
		setCart(list => [...list, id]);
	};

	const removeFromCart = id => {
		setCart(list => list.filter(x => x !== id));
	};

	const decreaseFromCart = id => {
		setCart(list => {
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
		setCompareList(prev => prev.includes(id) ? prev : [...prev, id]);
	};

	const removeFromCompare = (id) => {
		setCompareList(prev => prev.filter(item => item !== id));
	};

	const isCompared = (id) => compareList.includes(id);

	return (
		<GlobalContext.Provider value={{
			prodotti,
			setProdotti,
			favoriteList,
			toggleFavorite,
			isFavorite,
			cart,
			addToCart,
			isInCart,
			removeFromCart,
			decreaseFromCart,
			compareList,
			addToCompare,
			removeFromCompare,
			isCompared,
		}}>
			{children}
		</GlobalContext.Provider>
	);
}