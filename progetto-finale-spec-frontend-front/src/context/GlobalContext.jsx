import { createContext, useState, useEffect } from "react";
const { VITE_API_URL } = import.meta.env
export const GlobalContext = createContext()
export function GlobalProvider({ children }) {
	const [prodotti, setProdotti] = useState([])
	useEffect(() => {
		fetch(`${VITE_API_URL}/products`)
			.then(res => res.json())
			.then(data => {
				console.log("Risposta fetch prodotti:", data);
				setProdotti(data);
			})
			.catch(error => console.error(error))
	}, [])

	return (
		<GlobalContext.Provider value={{ prodotti, setProdotti }}>
			{children}
		</GlobalContext.Provider>
	)
}