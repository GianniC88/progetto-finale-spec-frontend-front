import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Link } from "react-router-dom";

export default function CartButton({ prodottoId }) {
  // Dal context prendiamo:
  // - addToCart/removeFromCart: mutazioni del carrello
  // - isInCart: helper per sapere se l'id è presente
  // - cart: array di id (può contenere duplicati per rappresentare la quantità)
  const { addToCart, removeFromCart, isInCart, cart } =
    useContext(GlobalContext);
  // Messaggio "flash" mostrato dopo l'azione (aggiunta/rimozione)
  const [msg, setMsg] = useState("");

  // Se ricevo un prodottoId, questo bottone agisce come toggle "add/remove" per quel prodotto
  if (prodottoId) {
    // selected = prodotto già presente nel carrello
    const selected = isInCart && isInCart(prodottoId);
    // quantity = quante volte questo id compare nel carrello
    const quantity = cart.filter((id) => id === prodottoId).length;

    const handleClick = () => {
      // Toggle: se è nel carrello lo rimuovo, altrimenti lo aggiungo
      if (selected) {
        removeFromCart(prodottoId);
        // Messaggio differenziato se la quantità era > 1
        if (quantity > 1) {
          setMsg(`Prodotti rimossi dal carrello! (${quantity})`);
        } else {
          setMsg("Prodotto rimosso dal carrello!");
        }
      } else {
        addToCart(prodottoId);
        setMsg("Prodotto aggiunto al carrello!");
      }
      // Nasconde automaticamente il messaggio dopo 1.5s
      setTimeout(() => setMsg(""), 1500);
    };

    return (
      <>
        <button
          onClick={handleClick}
          title={selected ? "Rimuovi dal carrello" : "Aggiungi al carrello"}
          className="cart-btn"
        >
          {/* Badge con la quantità per quel prodotto (solo se > 0) */}
          {quantity > 0 && <span className="cart-badge">{quantity}</span>}
          {/* Icona carrello: cambia stile se il prodotto è selezionato (in carrello) */}
          <span
            role="img"
            aria-label="Carrello"
            className="cart-navbar-icon"
            style={{
              filter: selected ? "grayscale(0%)" : "grayscale(60%)",
              opacity: selected ? 2 : 0.5,
              fontSize: "1em",
              transition: "filter 0.2s, opacity 0.2s",
            }}
          >
            🛒
          </span>
        </button>
        {/* Banner temporaneo con feedback dell'azione */}
        {msg && <div className="carrello-modal-banner">{msg}</div>}
      </>
    );
  }

  // Se non ricevo prodottoId, il componente viene usato come "icona carrello" di navigazione
  return (
    <Link
      to="/cart"
      className="nav-link position-relative"
      title="Vai al carrello"
    >
      <span
        role="img"
        aria-label="Carrello"
        className="cart-navbar-icon"
        style={{
          fontSize: "2.5em",
        }}
      >
        🛒
      </span>
      {/* Badge totale: numero di pezzi nel carrello (cart.length) */}
      {cart && cart.length > 0 && (
        <span className="cart-badge-total">{cart.length}</span>
      )}
    </Link>
  );
}
