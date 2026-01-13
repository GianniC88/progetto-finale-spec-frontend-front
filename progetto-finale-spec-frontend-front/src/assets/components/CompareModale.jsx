import { useSpicinessPeppers } from "./SpicinessPeppers";
import { useIsMobile } from "../customHook/utils/useIsMobile";
import CompareModalMobile from "./CompareModalMobile";
import React from "react";
import Modale from "./Modale";

export default function CompareModal({ show, onClose, prodotti }) {
  const isMobile = useIsMobile(768);

  if (!show) return null;

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
          <th className="compare-header-cell"></th>
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
              {p.image && (
                <img
                  src={p.image}
                  alt={p.title}
                  style={{
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
            <td key={p.id}>{useSpicinessPeppers(p.spiciness)}</td>
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

  return (
    <Modale
      title="Confronto dettagliato"
      content={content}
      show={show}
      onClose={onClose}
    />
  );
}
