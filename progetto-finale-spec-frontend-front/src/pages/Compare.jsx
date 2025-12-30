import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import CardDetail from "../assets/components/CardDetail";

export default function Compare() {
	const { compareList } = useContext(GlobalContext); // compareList deve essere un array di id
	const [prodotti, setProdotti] = useState([]);

	useEffect(() => {
		const apiUrl = import.meta.env.VITE_API_URL;
		if (!compareList || compareList.length === 0) {
			setProdotti([]);
			return;
		}
		Promise.all(
			compareList.map(id =>
				fetch(`${apiUrl}/products/${id}`)
					.then(res => res.json())
					.then(data => data.product || data)
			)
		).then(setProdotti);
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