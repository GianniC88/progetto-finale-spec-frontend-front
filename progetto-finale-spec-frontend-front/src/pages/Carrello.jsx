import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import ButtonAddRemove from "../assets/components/ButtonAddRemove";
import { useCartDetails } from "../assets/customHook/useCartDetails";
import { useCartCount } from "../assets/customHook/useCartCount";

export default function Carrello() {
  const { cart, removeFromCart, clearCart } = useContext(GlobalContext);
  const [selected, setSelected] = useState([]);
  const { dettagli, loading } = useCartDetails(cart);
  const cartCount = useCartCount(cart);

  const handleSelect = (id) => {
    setSelected((sel) =>
      sel.includes(id) ? sel.filter((x) => x !== id) : [...sel, id]
    );
  };

  const handleRemoveSelected = () => {
    selected.forEach((id) => removeFromCart(id));
    setSelected([]);
  };

  // Calcola il totale
  const totale = dettagli.reduce((sum, prodotto) => {
    const qty = cartCount[prodotto.id] || 0;
    const prezzo = Number(prodotto.price) || 0;
    return sum + qty * prezzo;
  }, 0);

  return (
    <div className="container my-4">
      <div
        className="container d-flex flex-column"
        style={{ minHeight: "50vh" }}
      >
        <h2>Carrello</h2>
        {loading ? (
          <div>Caricamento...</div>
        ) : dettagli.length === 0 ? (
          <div>Il carrello è vuoto.</div>
        ) : (
          <>
            <table
              className="table table-sm align-middle"
              style={{ width: "100%" }}
            >
              <colgroup>
                <col style={{ width: "4%" }} />
                <col style={{ width: "36%" }} />
                <col style={{ width: "15%" }} />
                <col style={{ width: "15%" }} />
                <col style={{ width: "15%" }} />
                <col style={{ width: "15%" }} />
              </colgroup>
              <thead>
                <tr>
                  <th></th>
                  <th>Prodotto</th>
                  <th>Prezzo</th>
                  <th>Qtà</th>
                  <th>Subtotale</th>
                  <th>Svuota</th>
                </tr>
              </thead>
              <tbody>
                {dettagli.map((prodotto) => (
                  <tr key={prodotto.id}>
                    <td style={{ textAlign: "center" }}>
                      <input
                        type="checkbox"
                        checked={selected.includes(prodotto.id)}
                        onChange={() => handleSelect(prodotto.id)}
                      />
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                        }}
                      >
                        <img
                          src={prodotto.image}
                          alt={prodotto.title}
                          style={{
                            width: 40,
                            height: 40,
                            objectFit: "cover",
                            borderRadius: 6,
                          }}
                        />
                        <span style={{ fontSize: "1.1em" }}>
                          {prodotto.title}
                        </span>
                      </div>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {prodotto.price ? `${prodotto.price} €` : "-"}
                    </td>
                    <td
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      <ButtonAddRemove
                        prodottoId={prodotto.id}
                        quantity={cartCount[prodotto.id] ?? 0}
                      />
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {prodotto.price
                        ? `${(cartCount[prodotto.id] * prodotto.price).toFixed(
                            2
                          )} €`
                        : "-"}
                    </td>
                    <td
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => removeFromCart(prodotto.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-3">
              <strong>Totale prodotti:</strong> {cart.length}
              <br />
              <strong>Totale carrello:</strong> {totale.toFixed(2)} €
            </div>
          </>
        )}
        <div className="">
          <button
            className="bordo btn btn-danger btn-sm mt-2 me-2"
            style={{ minWidth: "150px" }}
            onClick={handleRemoveSelected}
            disabled={selected.length === 0}
          >
            Rimuovi selezionati
          </button>
          <button
            className="bordo btn btn-danger btn-sm text-white mt-2"
            style={{ minWidth: "150px" }}
            onClick={clearCart}
            disabled={cart.length === 0}
          >
            Svuota carrello
          </button>
        </div>
      </div>
    </div>
  );
}
