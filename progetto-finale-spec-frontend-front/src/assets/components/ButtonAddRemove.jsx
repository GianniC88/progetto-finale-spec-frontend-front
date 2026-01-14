import { useContext, useRef, useState, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";

export default function ButtonAddRemove({ prodottoId, quantity }) {
  // Funzioni dal context: aggiunge 1 al carrello o decrementa di 1
  const { addToCart, decreaseFromCart } = useContext(GlobalContext);

  // Messaggio "flash" mostrato dopo un'azione (+ / -)
  const [msg, setMsg] = useState("");

  // useRef perché non serve un re-render: ci basta ricordare l'ultima azione
  const lastAction = useRef(null); // "add" o "remove"

  useEffect(() => {
    // Mostra il banner solo se c'è stata un'azione.
    // Dipende da quantity: dopo add/remove, quantity cambia e scatta l'effetto.
    if (lastAction.current === "add") {
      setMsg(`Prodotti aggiunti (${quantity})`);
      const t = setTimeout(() => setMsg(""), 1500);
      return () => clearTimeout(t);
    }
    if (lastAction.current === "remove") {
      setMsg(`Prodotti rimossi (${quantity})`);
      const t = setTimeout(() => setMsg(""), 1500);
      return () => clearTimeout(t);
    }
  }, [quantity]);

  const handleAdd = () => {
    // Salvo l'azione, poi aggiorno il carrello
    lastAction.current = "add";
    addToCart(prodottoId);
  };

  const handleRemove = () => {
    // Salvo l'azione, poi aggiorno il carrello
    lastAction.current = "remove";
    decreaseFromCart(prodottoId);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ gap: "6px", position: "relative" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          marginLeft: "20px",
        }}
      >
        {/* Bottone + : incrementa la quantità */}
        <button
          className="btn btn-outline-secondary"
          onClick={handleAdd}
          style={{
            minWidth: 18,
            fontSize: "0.85em",
            padding: "1px 6px",
            lineHeight: 1,
          }}
          title="Aggiungi"
        >
          +
        </button>
        {/* Bottone - : decrementa la quantità (disabilitato quando quantity <= 1) */}
        <button
          className="btn btn-outline-secondary"
          onClick={handleRemove}
          style={{
            minWidth: 18,
            fontSize: "0.85em",
            padding: "1px 6px",
            lineHeight: 1,
          }}
          disabled={quantity <= 1}
          title="Diminuisci"
        >
          -
        </button>
      </div>
      {/* Quantità attuale mostrata accanto ai bottoni */}
      <span style={{ fontSize: "0.95em", marginLeft: "4px" }}>{quantity}</span>
      {/* Banner temporaneo di feedback dell'azione */}
      {msg && (
        <div
          className="carrello-modal-banner"
          style={{ top: "50px", left: "50%", transform: "translateX(-50%)" }}
        >
          {msg}
        </div>
      )}
    </div>
  );
}
