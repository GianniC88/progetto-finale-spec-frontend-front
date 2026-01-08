import { useEffect, useState, useContext, useMemo } from "react";
import { GlobalContext } from "../context/GlobalContext";
import ProductRow from "../assets/components/ProductRow";
import ProductFilters from "../assets/components/ProductFilters";
import useDebounce from "../assets/customHook/useDebounce";
import useFetchProdotti from "../assets/customHook/useFetchProduct";
import useFetchCategorie from "../assets/customHook/useFetchCategorie";
import useOrdinaProdotti from "../assets/customHook/useOrdinaProdotti";

export default function ListaProdotti() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(() => {
    return localStorage.getItem("selectedCategory") || "";
  });
  const [sort, setSort] = useState("title-asc");

  const debouncedSearch = useDebounce(search, 400);
  const { clearFavorites, clearCart, clearCompare } = useContext(GlobalContext);
  const prodotti = useFetchProdotti(debouncedSearch, category, sort);
  const prodottiOrdinati = useOrdinaProdotti(prodotti, sort);

  const allCategorie = useFetchCategorie();

  const handleClearAll = () => {
    setSearch("");
    setCategory("");
    setSort("title-asc");
    clearFavorites();
    clearCart();
    clearCompare();
  };

  return (
    <div className="container p-4">
      <div className="prodotti-section">
        <h1 className="fw-bold mb-3 text-center titolo-prodotti">
          Lista Prodotti
        </h1>
        <div className="d-flex justify-content-center  gap-3">
          <ProductFilters
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            sort={sort}
            setSort={setSort}
            categorie={allCategorie}
          />
          <button
            className="btn btn-warning mb-3 d-none d-md-block"
            style={{ position: "absolute", right: 20, top: 100 }}
            onClick={handleClearAll}
          >
            Svuota <br />
            selezioni
          </button>
          <button
            className="btn btn-warning btn-sm mb-3 d-block d-md-none"
            style={{
              position: "absolute",
              right: 20,
              top: 100,
              fontSize: "0.85em",
            }}
            onClick={handleClearAll}
          >
            Svuota
          </button>
        </div>
        <div className="card shadow-sm card-prodotti-lista">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table mb-0 align-middle tabella-prodotti">
                {prodotti.length > 0 && (
                  <thead>
                    <tr>
                      <th className="th-titolo">Titolo</th>
                      <th className="th-categoria">Categoria</th>
                      <th className="th-azioni th-preferiti text-center">
                        Preferiti
                      </th>
                      <th className="th-azioni th-carrello">Carrello</th>
                      <th className="th-azioni th-addremove ps-4">+ / -</th>
                      <th
                        className="th-azioni th-compara"
                        style={{ paddingRight: "10px" }}
                      >
                        Compara
                      </th>
                    </tr>
                  </thead>
                )}
                <tbody>
                  {prodottiOrdinati.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-5 text-secondary"
                      >
                        <div style={{ fontSize: "2em" }}>🔍</div>
                        <div className="mt-2">Nessun prodotto trovato.</div>
                      </td>
                    </tr>
                  ) : (
                    prodottiOrdinati.map((prodotto) => (
                      <ProductRow prodotto={prodotto} key={prodotto.id} />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
