import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import CardDetail from "../assets/components/CardDetail";
import { useClearListMessage } from "../assets/customHook/useClearListMessage";

export default function Favorites() {
  const { favoriteList, clearFavorites } = useContext(GlobalContext);
  const [prodotti, setProdotti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, clearFavoritesWithMsg] = useClearListMessage(
    "Preferiti svuotati!"
  );

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const validIds = Array.isArray(favoriteList)
      ? favoriteList.filter(
          (id) => typeof id === "string" || typeof id === "number"
        )
      : [];
    if (validIds.length === 0) {
      setProdotti([]);
      setLoading(false);
      return;
    }
    Promise.all(
      validIds.map((id) =>
        fetch(`${apiUrl}/products/${id}`)
          .then((res) => (res.ok ? res.json() : null))
          .then((data) => (data && (data.product || data)) || null)
          .catch(() => null)
      )
    ).then((prodotti) => {
      setProdotti(prodotti.filter(Boolean));
      setLoading(false);
    });
  }, [favoriteList]);

  return (
    <div className="container my-4">
      <div
        className="container d-flex flex-column"
        style={{ minHeight: "50vh" }}
      >
        <h2>I tuoi preferiti</h2>
        {loading ? (
          <div>Caricamento...</div>
        ) : prodotti.length === 0 ? (
          <div>La lista preferiti è vuota.</div>
        ) : (
          <div className="row">
            {prodotti.map((prodotto) => (
              <div className="col-12 col-md-6 col-lg-4 mb-4" key={prodotto.id}>
                <CardDetail prodotto={prodotto} />
              </div>
            ))}
          </div>
        )}
        {favoriteList.length > 0 && (
          <div className="mt-4 text-center">
            <button
              className="btn btn-danger w-auto"
              onClick={() => clearFavoritesWithMsg(clearFavorites)}
              disabled={favoriteList.length === 0}
            >
              Elimina preferiti
            </button>
          </div>
        )}
        {msg && <div className="alert alert-success mt-4">{msg}</div>}
      </div>
    </div>
  );
}
