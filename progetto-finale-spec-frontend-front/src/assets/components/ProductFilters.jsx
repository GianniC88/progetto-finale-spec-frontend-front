import React, { useEffect } from "react";

export default function ProductFilters({
  // Valore corrente della ricerca (controllato dal componente padre)
  search,
  // Setter della ricerca (aggiorna lo stato nel componente padre)
  setSearch,
  // Categoria selezionata ("" = tutte)
  category,
  // Setter categoria
  setCategory,
  // Ordinamento selezionato (es. "title-asc")
  sort,
  // Setter ordinamento
  setSort,
  // Array di categorie disponibili (usato per generare le <option>)
  categorie,
}) {
  // Persistiamo alcune scelte in localStorage per ritrovarle al refresh.
  // Questo effect gira ogni volta che cambia `category` o `sort`.
  useEffect(() => {
    localStorage.setItem("selectedCategory", category);
    localStorage.setItem("selectedSort", sort);
  }, [category, sort]);

  return (
    <div className="mb-5 d-flex gap-3 flex-wrap justify-content-center product-filters">
      {/* Input controllato: value arriva dal padre, onChange chiama il setter */}
      <input
        type="text"
        placeholder="Cerca per titolo..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="form-control filter-input"
      />

      {/* Select controllato per filtrare per categoria */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="form-select filter-select p-2"
      >
        <option value="">Tutte le categorie</option>
        {/* Generiamo le option in base all'array `categorie` */}
        {categorie.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Select controllato per ordinamento */}
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="form-select filter-select"
      >
        <option value="title-asc">Titolo A-Z</option>
        <option value="title-desc">Titolo Z-A</option>
        <option value="category-asc">Categoria A-Z</option>
        <option value="category-desc">Categoria Z-A</option>
      </select>
    </div>
  );
}
