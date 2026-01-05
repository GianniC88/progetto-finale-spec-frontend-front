import React, { useEffect } from "react";

export default function ProductFilters({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
  categorie,
}) {
  // Salva la categoria selezionata su localStorage ogni volta che cambia
  useEffect(() => {
    localStorage.setItem("selectedCategory", category);
  }, [category]);

  return (
    <div className="mb-5 d-flex gap-3 flex-wrap justify-content-center product-filters">
      <input
        type="text"
        placeholder="Cerca per titolo..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="form-control filter-input"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="form-select filter-select p-2"
      >
        <option value="">Tutte le categorie</option>
        {categorie.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
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
