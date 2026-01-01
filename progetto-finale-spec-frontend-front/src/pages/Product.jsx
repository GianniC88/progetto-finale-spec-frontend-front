import { useEffect, useState } from "react";
import ProductRow from "../assets/components/ProductRow";
import ProductFilters from "../assets/components/ProductFilters";
import useDebounce from "../assets/customHook/useDebounce";

export default function ListaProdotti() {
  const [prodotti, setProdotti] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("title-asc");
  const [categorie, setCategorie] = useState([]);

  const debouncedSearch = useDebounce(search, 400); // debounce qui

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    let url = `${apiUrl}/products?`;
    if (debouncedSearch)
      url += `search=${encodeURIComponent(debouncedSearch)}&`;
    if (category) url += `category=${encodeURIComponent(category)}&`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const all = data.products || data;
        setCategorie([...new Set(all.map((p) => p.category))]);
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
      });
  }, [debouncedSearch, category, sort]);

  return (
    <div className="container p-4">
      <div className="prodotti-section">
        <h1 className="fw-bold mb-3 text-center titolo-prodotti">
          Lista Prodotti
        </h1>
        <ProductFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          sort={sort}
          setSort={setSort}
          categorie={categorie}
        />
        <div className="card shadow-sm card-prodotti-lista">
          <div className="card-body p-0">
            <table className="table mb-0 align-middle tabella-prodotti">
              {prodotti.length > 0 && (
                <thead>
                  <tr>
                    <th className="th-titolo">Titolo</th>
                    <th className="th-categoria">Categoria</th>
                    <th className="th-azioni text-center">Preferiti</th>
                    <th className="th-azioni">Carrello</th>
                    <th className="th-azioni ps-4">+ / -</th>
                    <th className="th-azioni">Compara</th>
                  </tr>
                </thead>
              )}
              <tbody>
                {prodotti.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-5 text-secondary">
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
  );
}
