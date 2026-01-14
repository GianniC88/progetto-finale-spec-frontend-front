import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";

export default function CompareButton({ prodottoId }) {
  // Legge dal contesto le funzioni per gestire la lista "comparatore"
  // e l'helper per sapere se un prodotto è già presente.
  const { addToCompare, removeFromCompare, isCompared } =
    useContext(GlobalContext);
  // Messaggio "flash" mostrato per un breve periodo dopo l'azione.
  const [msg, setMsg] = useState("");

  const handleClick = () => {
    // Toggle: se è già nel comparatore lo rimuovo, altrimenti lo aggiungo.
    if (isCompared && isCompared(prodottoId)) {
      removeFromCompare(prodottoId);
      setMsg("Prodotto rimosso dal comparatore!");
    } else {
      addToCompare(prodottoId);
      setMsg("Prodotto aggiunto al comparatore!");
    }
    // Nasconde automaticamente il messaggio dopo 1.5s.
    setTimeout(() => setMsg(""), 1500);
  };

  return (
    <>
      <button
        onClick={handleClick}
        // Tooltip/accessibilità: descrive l'azione che avverrà al click.
        title={
          isCompared && isCompared(prodottoId)
            ? "Rimuovi dal comparatore"
            : "Aggiungi al comparatore"
        }
        className="compare-btn"
      >
        {/* Icona diversa in base allo stato (già confrontato o no) */}
        {isCompared && isCompared(prodottoId) ? "✔️" : "⇄"}
      </button>
      {/* Banner temporaneo con feedback dell'azione */}
      {msg && <div className="compare-modal-banner">{msg}</div>}
    </>
  );
}
