import { useEffect, useState } from "react";
import Card from "./Card";

export default function ProdottiRandom() {
	const [prodotti, setProdotti] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
		fetch(`${apiUrl}/products`)
			.then(res => res.json())
			.then(data => {
				const all = data.products || data;
				const random = all
					.sort(() => 0.5 - Math.random())
					.slice(0, 4);
				setProdotti(random);
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, []);

	if (loading) return <div>Caricamento...</div>;
	if (!prodotti.length) return <div>Nessun prodotto trovato.</div>;

	return (
		<div className="container">
			<h2>Prodotti Random</h2>
			<div className="carosello-lista d-flex">
				{prodotti.map(prodotto => (
					<Card prodotto={prodotto} key={prodotto.id} />
				))}
			</div>
		</div>
	);
}