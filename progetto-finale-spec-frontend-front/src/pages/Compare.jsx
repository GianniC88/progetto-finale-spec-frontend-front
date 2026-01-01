import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import CompareModal from "../assets/components/CompareModale";
import CardDetail from "../assets/components/CardDetail";
import { useNavigate } from "react-router-dom";

export default function Compare() {
  const { compareList, setCompareList, removeFromCompare } =
    useContext(GlobalContext);
  const [prodotti, setProdotti] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const validIds = Array.isArray(compareList)
      ? compareList.filter(
          (id) => typeof id === "string" || typeof id === "number"
        )
      : [];
    if (validIds.length === 0) {
      setProdotti([]);
      return;
    }
    Promise.all(
      validIds.map((id) =>
        fetch(`${apiUrl}/products/${id}`)
          .then((res) => (res.ok ? res.json() : null))
          .then((data) => (data && (data.product || data)) || null)
          .catch(() => null)
      )
    ).then((prodotti) => setProdotti(prodotti.filter(Boolean)));
  }, [compareList]);

  // Quando compareList cambia (dopo eliminazione), azzera selected e il messaggio di successo
  useEffect(() => {
    if (showSuccess) {
      setSelected({});
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [compareList, showSuccess]);

  const handleDeleteSelected = () => {
    const idsToRemove = Object.keys(selected).filter((id) => selected[id]);
    setCompareList((prev) =>
      prev.filter((item) => !idsToRemove.map(Number).includes(Number(item)))
    );
    setShowSuccess(true);
  };

  return (
    <div className="container my-4">
      <div
        className="container d-flex flex-column"
        style={{ minHeight: "50vh" }}
      >
        <h2>Comparatore</h2>
        {showSuccess && (
          <div className="alert alert-success text-center" role="alert">
            Prodotti eliminati con successo!
            <button
              className="btn btn-sm btn-success ms-3"
              onClick={() => setShowSuccess(false)}
            >
              OK
            </button>
          </div>
        )}
        {prodotti.length < 2 ? (
          <div>Seleziona 2 prodotti dalla lista per confrontarli.</div>
        ) : (
          <>
            <div className="row">
              {prodotti.map((prodotto) => (
                <div
                  className="col-12 col-sm-6 col-lg-4 mb-4 mb-5"
                  key={prodotto.id}
                >
                  <CardDetail
                    prodotto={prodotto}
                    showCheckbox={true}
                    checked={!!selected[prodotto.id]}
                    onCheckboxChange={() =>
                      setSelected((sel) => ({
                        ...sel,
                        [prodotto.id]: !sel[prodotto.id],
                      }))
                    }
                  />
                </div>
              ))}
            </div>
            <div className="text-center  mt-4">
              <button
                className="btn btn-success text-white me-2"
                onClick={() => setShowModal(true)}
                disabled={Object.values(selected).filter(Boolean).length < 2}
              >
                Compara prodotti selezionati
              </button>
              <button
                className="btn btn-primary text-white me-2"
                onClick={() => navigate("/products")}
              >
                Aggiungi prodotto
              </button>
              <button
                className="btn btn-danger text-white me-2"
                onClick={handleDeleteSelected}
                disabled={Object.values(selected).filter(Boolean).length === 0}
              >
                Elimina selezionati
              </button>
              <button
                className="btn btn-danger text-white me-2"
                onClick={() => {
                  setCompareList([]);
                  setSelected({});
                }}
              >
                Svuota comparatore
              </button>
              <CompareModal
                show={showModal}
                onClose={() => setShowModal(false)}
                prodotti={prodotti.filter((p) => selected[p.id])}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
