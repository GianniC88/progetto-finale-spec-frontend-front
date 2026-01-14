import { SpicinessPeppers } from "../components/SpicinessPeppers";
import { useIsMobile } from "../customHook/utils/useIsMobile";
import CompareModalMobile from "./CompareModalMobile";
import React from "react";
import Modale from "./Modale";

// Modale di confronto: riceve una lista di prodotti e li mostra affiancati.
// Props:
// - show: boolean -> se false la modale non viene renderizzata
// - onClose: function -> callback per chiudere la modale
// - prodotti: array di oggetti prodotto -> dati da confrontare (id, title, image, category, price, brand, spiciness, description...)
export default function CompareModal({ show, onClose, prodotti }) {
  // Hook che ritorna true se lo schermo è sotto la soglia (qui 768px)
  const isMobile = useIsMobile(768);

  // Guard clause: se la modale non è "aperta", non renderizzo nulla
  if (!show) return null;

  // Se siamo su mobile, delego il rendering al componente dedicato (layout ottimizzato)
  if (isMobile) {
    // Mostra la versione mobile sotto i 768px
    return (
      <CompareModalMobile show={show} onClose={onClose} prodotti={prodotti} />
    );
  }

  // Versione desktop (tabella completa)
  const content = (
    <table className="table table-bordered">
      <thead>
        <tr className="compare-header-row">
          {/* Prima cella vuota: colonna per le etichette delle righe (Categoria/Prezzo/...) */}
          <th className="compare-header-cell"></th>
          {/* Header: un <th> per ogni prodotto */}
          {prodotti.map((p) => (
            <th className="compare-header-cell" key={p.id}>
              {p.title}
            </th>
          ))}
        </tr>
        <tr>
          <th></th>
          {prodotti.map((p) => (
            <td key={p.id} style={{ textAlign: "center" }}>
              {/* Render condizionale: mostra la miniatura solo se esiste p.image */}
              {p.image && (
                <img
                  src={p.image}
                  alt={p.title}
                  style={{
                    // Vincoli per non "rompere" la tabella con immagini troppo grandi
                    maxWidth: "100px",
                    maxHeight: "80px",
                    objectFit: "contain",
                  }}
                />
              )}
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* Ogni riga: a sinistra l'etichetta, a destra il valore per ciascun prodotto */}
        <tr>
          <td>
            <strong>Categoria</strong>
          </td>
          {prodotti.map((p) => (
            <td key={p.id}>{p.category}</td>
          ))}
        </tr>
        <tr>
          <td>
            <strong>Prezzo</strong>
          </td>
          {prodotti.map((p) => (
            <td key={p.id}>{p.price} €</td>
          ))}
        </tr>
        <tr>
          <td>
            <strong>Brand</strong>
          </td>
          {prodotti.map((p) => (
            <td key={p.id}>{p.brand}</td>
          ))}
        </tr>
        <tr>
          <td>
            <strong>Piccantezza</strong>
          </td>
          {prodotti.map((p) => (
            <td key={p.id}>
              {/* Componente dedicato: trasforma il valore in una rappresentazione grafica */}
              <SpicinessPeppers spiciness={p.spiciness} />
            </td>
          ))}
        </tr>
        <tr>
          <td>
            <strong>Descrizione</strong>
          </td>
          {prodotti.map((p) => (
            <td key={p.id}>{p.description}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );

  // Modale contenitore: riceve titolo, contenuto (tabella) e callback di chiusura
  return (
    <Modale
      title="Confronto dettagliato"
      content={content}
      show={show}
      onClose={onClose}
    />
  );
}
