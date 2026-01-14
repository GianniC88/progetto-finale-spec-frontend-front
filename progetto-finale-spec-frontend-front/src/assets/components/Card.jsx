import React from "react";
import { Link } from "react-router-dom";

export default function Card({ prodotto }) {
  // `prodotto` viene passato dal componente padre e qui lo mostro in formato "card"
  if (!prodotto) return null;
  return (
    <div className="card-prodotto" key={prodotto.id}>
      {/* Immagine principale del prodotto */}
      <div className="card-img">
        <img src={prodotto.image} alt={prodotto.title} />
      </div>
      <h1>{prodotto.title}</h1>
      {/* Lista reinderizzata delle caratteristiche; dove mancano dati mostro "-" */}
      <ul className="caratteristiche-carosello">
        <li>
          <strong>Categoria:</strong> {prodotto.category || "-"}
        </li>
        <li>
          <strong>Prezzo:</strong>{" "}
          {prodotto.price ? prodotto.price + " €" : "-"}
        </li>
        <li>
          <strong>Brand:</strong> {prodotto.brand || "-"}
        </li>
        <li>
          <strong>Piccantezza:</strong> {prodotto.spiciness || "-"}
        </li>
        {/* available può essere boolean o undefined (non presente in tutti i prodotti) */}
        <li>
          <strong>Disponibile:</strong>{" "}
          {prodotto.available !== undefined
            ? prodotto.available
              ? "Sì"
              : "No"
            : "-"}
        </li>
        <li>
          <strong>Descrizione:</strong> {prodotto.description || "-"}
        </li>
      </ul>
      {/* Navigazione alla pagina di dettaglio */}
      <Link to={`/products/${prodotto.id}`}>
        <button>dettagli</button>
      </Link>
    </div>
  );
}
