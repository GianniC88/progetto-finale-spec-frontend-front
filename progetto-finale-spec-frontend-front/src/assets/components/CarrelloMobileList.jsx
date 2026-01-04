import ButtonAddRemove from "./ButtonAddRemove";

export default function CarrelloMobileList({
  dettagli,
  selected,
  handleSelect,
  cartCount,
  showMsg,
  removeFromCart,
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
            <input
              type="checkbox"
              checked={!!selected[prodotto.id]}
              onChange={() => handleSelect(prodotto.id)}
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
            {prodotto.price
              ? `${(cartCount[prodotto.id] * prodotto.price).toFixed(2)} €`
              : "-"}
            {msg && <span className="compare-msg ms-2">{msg}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
