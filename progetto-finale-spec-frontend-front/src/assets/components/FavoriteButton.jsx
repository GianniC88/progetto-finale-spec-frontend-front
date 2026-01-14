import { useContext, useState, useRef } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Link } from "react-router-dom";

export default function FavoriteButton({ prodottoId, navbar }) {
  // Dal GlobalContext prendiamo:
  // - toggleFavorite: aggiunge/rimuove un id dalla lista preferiti
  // - isFavorite: helper che torna true/false dato un prodottoId
  // - favoriteList: lista degli id preferiti (usata per il badge in navbar)
  const { toggleFavorite, isFavorite, favoriteList } =
    useContext(GlobalContext);

  // Messaggio "flash" mostrato dopo l'azione (aggiunto/rimosso)
  const [msg, setMsg] = useState("");

  // Riferimento al timeout per poterlo resettare quando clicchi più volte di seguito
  const timerRef = useRef(null);

  // Versione per la navbar
  if (navbar) {
    return (
      <Link
        to="/favorites"
        className="nav-link position-relative"
        title="Vai ai preferiti"
      >
        <span
          role="img"
          aria-label="Preferiti"
          className="cart-navbar-icon"
          style={{
            fontSize: "2.5em",
          }}
        >
          ❤️
        </span>
        {/* Badge: numero totale di prodotti nei preferiti */}
        {favoriteList && favoriteList.length > 0 && (
          <span className="cart-badge-total">{favoriteList.length}</span>
        )}
      </Link>
    );
  }

  // Versione standard (per la tabella)
  // isSelected indica se il prodotto corrente è già tra i preferiti
  const isSelected = isFavorite(prodottoId);

  const handleClick = () => {
    // Toggle dello stato preferito per questo prodotto
    toggleFavorite(prodottoId);

    // Evita che rimangano timeout pendenti se l'utente clicca in sequenza
    clearTimeout(timerRef.current);

    // Messaggio in base allo stato precedente (prima del toggle)
    setMsg(isSelected ? "Rimosso dai Preferiti" : "Aggiunto ai Preferiti");

    // Nasconde automaticamente il messaggio dopo 1.5s
    timerRef.current = setTimeout(() => setMsg(""), 1500);
  };

  return (
    <>
      <button
        onClick={handleClick}
        // Tooltip: spiega l'azione/stato
        title={isSelected ? "Già nei preferiti" : "Aggiungi ai preferiti"}
        style={{
          background: "none",
          border: "none",
          fontSize: "1.2em",
          cursor: "pointer",
          transition: "color 0.2s",
        }}
      >
        <span role="img" aria-label="Preferiti">
          {/* Cuore pieno se già nei preferiti, vuoto altrimenti */}
          {isSelected ? "❤️" : "🤍"}
        </span>
      </button>
      {/* Banner temporaneo di feedback dell'azione */}
      {msg && <div className="carrello-modal-banner">{msg}</div>}
    </>
  );
}
