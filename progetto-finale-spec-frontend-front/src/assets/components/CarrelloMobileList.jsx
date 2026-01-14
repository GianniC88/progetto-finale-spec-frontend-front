import ButtonAddRemove from "./ButtonAddRemove";

export default function CarrelloMobileList({
  // Lista di prodotti con i dettagli (titolo, immagine, prezzo, id, ...)
  dettagli,
  // Stato selezione checkbox: { [idProdotto]: true/false }
  selected,
  // Handler per toggle della selezione (gestito dal componente padre)
  handleSelect,
  // Mappa quantità: { [idProdotto]: quantita }
  cartCount,
  // Callback per mostrare un messaggio/feedback dopo + / -
  showMsg,
  // Rimuove completamente un prodotto dal carrello
  removeFromCart,
  // Messaggio "flash" (unico) mostrato dopo un'azione
  msg,
}) {
  return (
    <div className="carrello-mobile-list ms-3 md-3  p-1">
      {dettagli.map((prodotto) => (
        <div
          key={prodotto.id}
          className="carrello-mobile-card mb-4 mt-2 me-3 p-3 border rounded shadow-sm bg-white"
        >
          <div className="d-flex align-items-center gap-2 mb-2">
            {/* Checkbox selezione riga (per rimozione multipla nel padre) */}
            <input
              type="checkbox"
              checked={!!selected[prodotto.id]}
              onChange={() => handleSelect(prodotto.id)}
              aria-label={`Seleziona ${prodotto.title}`}
            />
            <img
              src={prodotto.image}
              alt={prodotto.title}
              className="rounded"
              width={40}
              height={40}
              style={{ objectFit: "cover" }}
            />
            <span style={{ fontWeight: 600 }}>{prodotto.title}</span>
          </div>
          <div className="mb-2">
            <strong>Prezzo:</strong>{" "}
            {prodotto.price ? `${prodotto.price} €` : "-"}
          </div>
          <div className="d-flex flex-column mb-2">
            <div>
              <strong>Qtà:</strong> <span>{cartCount[prodotto.id] ?? 0}</span>
            </div>
            <div className="align-self-start mt-2">
              <ButtonAddRemove prodottoId={prodotto.id} onAction={showMsg} />
            </div>
          </div>
          <div>
            <strong>Subtotale:</strong>{" "}
            {/* Nel totale usiamo Number(price) per sicurezza (price può arrivare come stringa) */}
            {prodotto.price
              ? `${(
                  (cartCount[prodotto.id] ?? 0) * (Number(prodotto.price) || 0)
                ).toFixed(2)} €`
              : "-"}
            {msg && <span className="compare-msg ms-2">{msg}</span>}
          </div>

          {/* Rimuovi singolo prodotto (azione equivalente al cestino su desktop) */}
          <div className="mt-2">
            <button
              className="btn btn-sm btn-danger"
              onClick={() => removeFromCart(prodotto.id)}
              aria-label={`Rimuovi ${prodotto.title} dal carrello`}
              title="Rimuovi"
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
