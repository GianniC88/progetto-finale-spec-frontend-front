import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import ProductRow from "../assets/components/ProductRow";
import ProductFilters from "../assets/components/ProductFilters";
import useDebounce from "../assets/customHook/useDebounce";

export default function ListaProdotti() {
  const [prodotti, setProdotti] = useState([]);
  const [allCategorie, setAllCategorie] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(() => {
    return localStorage.getItem("selectedCategory") || "";
  });
  const [sort, setSort] = useState("title-asc");

  const debouncedSearch = useDebounce(search, 400);
  const { clearFavorites, clearCart, clearCompare } = useContext(GlobalContext);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    // Prendi sempre TUTTI i prodotti per calcolare le categorie disponibili
    fetch(`${apiUrl}/products`)
      .then((res) => res.json())
      .then((data) => {
        const all = data.products || data;
        setAllCategorie(
          Array.from(new Set(all.map((p) => p.category))).filter(Boolean)
        );
      });
  }, []);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    let url = `${apiUrl}/products?`;
    if (debouncedSearch)
      url += `search=${encodeURIComponent(debouncedSearch)}&`;
    if (category) url += `category=${encodeURIComponent(category)}&`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Errore nella risposta");
        return res.json();
      })
      .then((data) => {
        const all = data.products || data;
        let ordinati = [...all];
        if (sort === "title-asc")
          ordinati.sort((a, b) => a.title.localeCompare(b.title));
        if (sort === "title-desc")
          ordinati.sort((a, b) => b.title.localeCompare(a.title));
        if (sort === "category-asc")
          ordinati.sort((a, b) => a.category.localeCompare(b.category));
        if (sort === "category-desc")
          ordinati.sort((a, b) => b.category.localeCompare(a.category));
        setProdotti(ordinati);
      })
      .catch((error) => {
        console.error("Errore fetch prodotti:", error);
        setProdotti([]); // oppure mostra un messaggio di errore
      });
  }, [debouncedSearch, category, sort]);

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
                      </th>{" "}
                    </tr>
                  </thead>
                )}
                <tbody>
                  {prodotti.length === 0 ? (
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
                    prodotti.map((prodotto) => (
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
