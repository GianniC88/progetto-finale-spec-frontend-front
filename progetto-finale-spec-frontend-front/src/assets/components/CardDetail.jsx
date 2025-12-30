import React from "react";

const labels = {
	title: "Titolo",
	category: "Categoria",
	price: "Prezzo",
	brand: "Brand",
	description: "Descrizione",
	spiciness: "Piccantezza",
	available: "Disponibile",
	images: "Immagini aggiuntive"
};

const CardDetail = ({ prodotto }) => {
	if (!prodotto) return <div>Nessun prodotto trovato.</div>;
	return (
		<div className="card-detail">
			<h2>{prodotto.title}</h2>
			{prodotto.image && (
				<img
					src={prodotto.image}
					alt={prodotto.title || "Immagine prodotto"}
					style={{ maxWidth: "300px", marginBottom: "1rem" }}
				/>
			)}
			<ul>
				<li><strong>{labels.title}:</strong> {prodotto.title}</li>
				<li><strong>{labels.category}:</strong> {prodotto.category}</li>
				<li><strong>{labels.price}:</strong> {prodotto.price ? prodotto.price + " €" : "-"}</li>
				<li><strong>{labels.brand}:</strong> {prodotto.brand || "-"}</li>
				<li><strong>{labels.description}:</strong> {prodotto.description || "-"}</li>
				<li><strong>{labels.spiciness}:</strong> {prodotto.spiciness || "-"}</li>

				{prodotto.images && Array.isArray(prodotto.images) && (
					<li>
						<strong>{labels.images}:</strong>
						<ul>
							{prodotto.images.map((img, idx) => (
								<li key={idx}>
									<img src={img} alt={`Immagine aggiuntiva ${idx + 1}`} style={{ maxWidth: "100px", margin: "5px" }} />
								</li>
							))}
						</ul>
					</li>
				)}
			</ul>
		</div>
	);
};

export default CardDetail;