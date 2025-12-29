import { useState, useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

export default function ProdottiRandom() {
	const { prodotti } = useContext(GlobalContext);
	const [indice, setIndice] = useState(0);

	const prodottiRandom = prodotti.slice().sort(() => 0.5 - Math.random());
	const perPagina = 4;
	const max = Math.max(0, prodottiRandom.length - perPagina);

	const avanti = () => setIndice(i => (i + perPagina > max ? 0 : i + perPagina));
	const indietro = () => setIndice(i => (i - perPagina < 0 ? max : i - perPagina));

	const visibili = prodottiRandom.slice(indice, indice + perPagina);

	if (!prodotti.length) return <div>Caricamento...</div>;
	if (!visibili.length) return <div>Nessun prodotto trovato.</div>;
	return (
		<div className="container">
			<h2>Prodotti Random</h2>
			<div className="carosello-lista d-flex">
				{visibili.map(prodotto => (
					<div className="card-prodotto" key={prodotto.id ?? Math.random()}>
						<div className="card-img">
							<img src={prodotto.image} alt={prodotto.title} />
						</div>
						<h4>{prodotto.title}</h4>
						<ul className="caratteristiche-carosello">
							<li><strong>Categoria:</strong> {prodotto.category || "-"}</li>
							<li><strong>Prezzo:</strong> {prodotto.price ? prodotto.price + " €" : "-"}</li>
							<li><strong>Brand:</strong> {prodotto.brand || "-"}</li>
							<li><strong>Piccantezza:</strong> {prodotto.spiciness || "-"}</li>
							<li><strong>Disponibile:</strong> {prodotto.available !== undefined ? (prodotto.available ? "Sì" : "No") : "-"}</li>
							<li><strong>Descrizione:</strong> {prodotto.description || "-"}</li>
						</ul>
					</div>
				))}
			</div>
			<div className="carosello-bottoni">
				<button onClick={indietro} className="btn btn-secondary me-2">{"<"}</button>
				<button onClick={avanti} className="btn btn-secondary">{">"}</button>
			</div>
		</div>
	);
}