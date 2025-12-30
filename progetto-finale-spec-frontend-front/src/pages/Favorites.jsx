import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import CardDetail from "../assets/components/CardDetail";
import FavoriteButton from "../assets/components/FavoriteButton";

export default function Favorites() {
	const { favoriteList } = useContext(GlobalContext);
	const [dettagli, setDettagli] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const apiUrl = import.meta.env.VITE_API_URL;
		if (favoriteList.length === 0) {
			setDettagli([]);
			setLoading(false);
			return;
		}
		Promise.all(
			favoriteList.map(id =>
				fetch(`${apiUrl}/products/${id}`)
					.then(res => res.json())
					.then(data => data.product || data)
			)
		).then(prodotti => {
			setDettagli(prodotti);
			setLoading(false);
		});
	}, [favoriteList]);

	return (
		<div className="container my-4">
			<h2>I tuoi preferiti</h2>
			{loading ? (
				<div>Caricamento...</div>
			) : dettagli.length === 0 ? (
				<div>La lista preferiti è vuota.</div>
			) : (
				<div className="row">
					{dettagli.map(prodotto => (
						<div className="col-12 col-md-6 col-lg-4 mb-4" key={prodotto.id}>
							<CardDetail prodotto={prodotto} />
							<div className="mt-2">
								<FavoriteButton prodottoId={prodotto.id} />
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}