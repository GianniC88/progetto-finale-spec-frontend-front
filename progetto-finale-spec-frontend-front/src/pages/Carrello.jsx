import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import ButtonAddRemove from "../assets/components/ButtonAddRemove";
import { useCartDetails } from "../assets/customHook/cart/useCartDetails";
import { useCartCount } from "../assets/customHook/cart/useCartCount";
import { useActionMessage } from "../assets/customHook/utils/useActionMessage";
import { useIsMobile } from "../assets/customHook/utils/useIsMobile";
import { useSelectedReducer } from "../assets/customHook/cart/useSelectedReduce";
import CarrelloMobileList from "../assets/components/CarrelloMobileList";

export default function Carrello() {
  const { cart, removeFromCart, clearCart } = useContext(GlobalContext);
  const [selected, dispatchSelected] = useSelectedReducer();
  const { dettagli, loading } = useCartDetails(cart);
  const cartCount = useCartCount(cart);
  const [msg, showMsg] = useActionMessage();
  const isMobile = useIsMobile(768);

  const handleSelect = (id) => {
    dispatchSelected({ type: "toggle", id });
  };

  const handleRemoveSelected = () => {
    Object.keys(selected)
      .filter((id) => selected[id])
      .forEach((id) => removeFromCart(Number(id)));
    dispatchSelected({ type: "clear" });
  };

  // Calcola il totale
  const totale = dettagli.reduce((sum, prodotto) => {
    const qty = cartCount[prodotto.id] || 0;
    const prezzo = Number(prodotto.price) || 0;
    return sum + qty * prezzo;
  }, 0);

  return (
    <div className="main-content ">
      <h2 className="ms-2">Carrello</h2>
      {loading ? (
        <div>Caricamento...</div>
      ) : dettagli.length === 0 ? (
        <div>Il carrello è vuoto.</div>
      ) : (
        <>
          {isMobile ? (
            <CarrelloMobileList
              dettagli={dettagli}
              selected={selected}
              handleSelect={handleSelect}
              cartCount={cartCount}
              showMsg={showMsg}
              removeFromCart={removeFromCart}
              msg={msg}
            />
          ) : (
            <div className="table-responsive-mobile ">
              <table
                className="table table-sm align-middle "
                style={{ width: "100%" }}
              >
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
                <tbody className="ms-2">
                  {dettagli.map((prodotto) => (
                    <tr key={prodotto.id}>
                      <td style={{ textAlign: "center" }}>
                        <input
                          type="checkbox"
                          checked={!!selected[prodotto.id]}
                          onChange={() => handleSelect(prodotto.id)}
                        />
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <img
                            src={prodotto.image}
                            alt={prodotto.title}
                            className="rounded"
                            width={40}
                            height={40}
                            style={{ objectFit: "cover" }}
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
                        <div className="d-flex align-items-center justify-content-center gap-2">
                          <ButtonAddRemove
                            prodottoId={prodotto.id}
                            onAction={showMsg}
                          />
                          <span>{cartCount[prodotto.id] ?? 0}</span>
                        </div>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {prodotto.price
                          ? `${(
                              cartCount[prodotto.id] * prodotto.price
                            ).toFixed(2)} €`
                          : "-"}
                        {msg && <span className="compare-msg ms-2">{msg}</span>}
                      </td>
                      <td
                        style={{ textAlign: "center", verticalAlign: "middle" }}
                      >
                        <div className="d-flex flex-column align-items-center gap-1">
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
            </div>
          )}

          <div className="mt-3 ms-2">
            <strong>Totale prodotti:</strong> {cart.length}
            <br />
            <strong>Totale carrello:</strong> {totale.toFixed(2)} €
          </div>
        </>
      )}
      {cart.length > 0 && (
        <div>
          <button
            className="bordo btn btn-danger btn-sm mt-2 me-2 btn-cart"
            onClick={handleRemoveSelected}
            disabled={Object.values(selected).filter(Boolean).length === 0}
          >
            Rimuovi selezionati
          </button>
          <button
            className="bordo btn btn-danger btn-sm text-white mt-2 btn-cart"
            onClick={clearCart}
            disabled={cart.length === 0}
          >
            Svuota carrello
          </button>
        </div>
      )}
    </div>
  );
}
