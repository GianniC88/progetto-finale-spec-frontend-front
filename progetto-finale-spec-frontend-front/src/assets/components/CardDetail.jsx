import React, { useContext, useState } from "react";
import { SpicinessPeppers } from "../components/SpicinessPeppers";
import { GlobalContext } from "../../context/GlobalContext";
import FavoriteButton from "./FavoriteButton";
import CartButton from "./CartButton";
import ButtonAddRemove from "./ButtonAddRemove";
import CompareButton from "./CompareButton";
const labels = {
  title: "Titolo",
  category: "Categoria",
  price: "Prezzo",
  brand: "Brand",
  description: "Descrizione",
  spiciness: "Piccantezza",
  available: "Disponibile",
  images: "Immagini aggiuntive",
};

const CardDetail = ({
  prodotto,
  showCheckbox = false,
  checked = false,
  onCheckboxChange,
}) => {
  const { isFavorite } = useContext(GlobalContext);
  const [modalImg, setModalImg] = useState(null);

  if (!prodotto) return <div>Nessun prodotto trovato.</div>;
  return (
    <div className="card-detail card-common " style={{ position: "relative" }}>
      <h2>{prodotto.title}</h2>
      {prodotto.image && (
        <img
          src={prodotto.image}
          alt={prodotto.title || "Immagine prodotto"}
          style={{ maxWidth: "300px", marginBottom: "1rem", cursor: "pointer" }}
          onClick={() => setModalImg(prodotto.image)}
        />
      )}
      <ul className="card-detail-list mb-5">
        <li>
          <strong>{labels.title}:</strong> {prodotto.title}
        </li>
        <li>
          <strong>{labels.category}:</strong> {prodotto.category}
        </li>
        <li>
          <strong>{labels.price}:</strong>{" "}
          {prodotto.price ? prodotto.price + " €" : "-"}
        </li>
        <li>
          <strong>{labels.brand}:</strong> {prodotto.brand || "-"}
        </li>
        <li>
          <strong>{labels.description}:</strong> {prodotto.description || "-"}
        </li>
        <li>
          <strong>{labels.spiciness}:</strong>{" "}
          <SpicinessPeppers spiciness={prodotto.spiciness} />
        </li>
        {Array.isArray(prodotto.images) &&
          prodotto.images.filter(Boolean).length > 0 && (
            <li>
              <strong>{labels.images}:</strong>
              <ul>
                {prodotto.images.filter(Boolean).map((img, idx) => (
                  <li key={`${img}-${idx}`}>
                    <img
                      src={img}
                      alt={`Immagine aggiuntiva ${idx + 1}`}
                      style={{
                        maxWidth: "100px",
                        margin: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => setModalImg(img)}
                    />
                  </li>
                ))}
              </ul>
            </li>
          )}
      </ul>
      <div className="d-flex card-actions-fixed">
        <FavoriteButton prodottoId={prodotto.id} />
        {isFavorite && isFavorite(prodotto.id) && (
          <>
            <CartButton prodottoId={prodotto.id} />
            <ButtonAddRemove prodottoId={prodotto.id} />
            <CompareButton prodottoId={prodotto.id} />
          </>
        )}
      </div>
      {/* Checkbox solo se richiesto */}
      {showCheckbox && (
        <div className="card-checkbox">
          <input
            type="checkbox"
            checked={checked}
            onChange={onCheckboxChange}
          />{" "}
          Seleziona
        </div>
      )}
      {/* Modale per immagine ingrandita */}
      {modalImg && (
        <div
          className="modal-backdrop"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
          onClick={() => setModalImg(null)}
        >
          <img
            src={modalImg}
            alt="Immagine ingrandita"
            style={{
              maxHeight: "80vh",
              maxWidth: "90vw",
              borderRadius: "8px",
              boxShadow: "0 0 20px #000",
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default CardDetail;
