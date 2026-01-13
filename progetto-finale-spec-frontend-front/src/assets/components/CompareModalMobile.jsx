import React, { useState } from "react";
import { useSpicinessPeppers } from "./SpicinessPeppers";

export default function CompareModalMobile({ show, onClose, prodotti }) {
  const [descModal, setDescModal] = useState(null);

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
        <h4 className="mb-3">
          <strong>Confronto dettagliato</strong>
        </h4>
        {prodotti.map((p) => (
          <div
            key={p.id}
            className="mb-4 p-3 border rounded bg-white shadow-sm"
          >
            <div className="text-center mb-2">
              <img
                src={p.image}
                alt={p.title}
                style={{
                  maxWidth: "100px",
                  maxHeight: "80px",
                  objectFit: "contain",
                }}
              />
            </div>
            <div>
              <strong>{p.title}</strong>
            </div>
            <div>
              <strong>Categoria:</strong> {p.category}
            </div>
            <div>
              <strong>Prezzo:</strong> {p.price} €
            </div>
            <div>
              <strong>Brand:</strong> {p.brand}
            </div>
            <div>
              <strong>Piccantezza:</strong> {useSpicinessPeppers(p.spiciness)}
            </div>
            <div>
              <strong>Descrizione:</strong>{" "}
              <details
                style={{ display: "inline" }}
                onClick={(e) => {
                  e.preventDefault();
                  setDescModal({ title: p.title, description: p.description });
                }}
              >
                <summary
                  style={{
                    color: "#0d6efd",
                    cursor: "pointer",
                    textDecoration: "underline",
                    display: "inline",
                  }}
                >
                  Mostra dettagli
                </summary>
              </details>
            </div>
          </div>
        ))}

        {/* Modale descrizione */}
        {descModal && (
          <div
            className="custom-modal"
            style={{
              background: "rgba(0,0,0,0.5)",
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => setDescModal(null)}
          >
            <div
              className="custom-modal-dialog"
              style={{
                maxWidth: 350,
                background: "#fff",
                borderRadius: 8,
                padding: 20,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h5>{descModal.title}</h5>
              <p>{descModal.description}</p>
              <button
                className="btn btn-secondary mt-2"
                onClick={() => setDescModal(null)}
              >
                Chiudi
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
