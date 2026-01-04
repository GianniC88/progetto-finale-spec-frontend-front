import { useSpicinessPeppers } from "../customHook/useSpicinessPeppers";
import React from "react";

export default function CompareModal({ show, onClose, prodotti }) {
  if (!show) return null;

  return (
    <div className="custom-modal" onClick={onClose}>
      <div className="custom-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button
          className="btn btn-danger custom-modal-close-btn"
          onClick={onClose}
        >
          Chiudi
        </button>
        <h3 className="mb-4">
          <strong>Confronto dettagliato</strong>
        </h3>
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
      </div>
    </div>
  );
}
