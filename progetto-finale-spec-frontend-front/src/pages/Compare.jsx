import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import CardDetail from "../assets/components/CardDetail";

export default function Compare() {
	const { compareList } = useContext(GlobalContext);
	const [prodotti, setProdotti] = useState([]);

	useEffect(() => {
		const apiUrl = import.meta.env.VITE_API_URL;
		const validIds = Array.isArray(compareList)
			? compareList.filter(id => typeof id === "string" || typeof id === "number")
			: [];
		if (validIds.length === 0) {
			setProdotti([]);
			return;
		}
		Promise.all(
			validIds.map(id =>
				fetch(`${apiUrl}/products/${id}`)
					.then(res => res.ok ? res.json() : null)
					.then(data => (data && (data.product || data)) || null)
					.catch(() => null)
			)
		).then(prodotti => setProdotti(prodotti.filter(Boolean)));
	}, [compareList]);

	return (
		<div className="container my-4">
			<h2>Comparatore</h2>
			{prodotti.length < 2 ? (
				<div>Seleziona 2 prodotti dalla lista per confrontarli.</div>
			) : (
				<div className="row">
					{prodotti.map(prodotto => (
						<div className="col-12 col-md-6 mb-4" key={prodotto.id}>
							<CardDetail prodotto={prodotto} />
						</div>
					))}
				</div>
			)}
		</div>
	);
}