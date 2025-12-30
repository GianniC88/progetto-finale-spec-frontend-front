import React from "react";
import { Link } from "react-router-dom";

export default function Card({ prodotto }) {
	if (!prodotto) return null;
	return (
		<div className="card-prodotto" key={prodotto.id}>
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
			<Link to={`/products/${prodotto.id}`}>
				<button>dettagli</button>
			</Link>
		</div>
	);
}
