import React from "react";

export default function ProductFilters({
	search,
	setSearch,
	category,
	setCategory,
	sort,
	setSort,
	categorie
}) {
	return (
		<div className="mb-2 d-flex gap-2 flex-wrap justify-content-center">
			<input
				type="text"
				placeholder="Cerca per titolo..."
				value={search}
				onChange={e => setSearch(e.target.value)}
				className="form-control"
				style={{ maxWidth: 180, fontSize: "0.97em", padding: "4px 8px" }}
			/>
			<select
				value={category}
				onChange={e => setCategory(e.target.value)}
				className="form-select"
				style={{ maxWidth: 160, fontSize: "0.97em", padding: "4px 8px" }}
			>
				<option value="">Tutte le categorie</option>
				{categorie.map(cat => (
					<option key={cat} value={cat}>{cat}</option>
				))}
			</select>
			<select
				value={sort}
				onChange={e => setSort(e.target.value)}
				className="form-select"
				style={{ maxWidth: 160, fontSize: "0.97em", padding: "4px 8px" }}
			>
				<option value="title-asc">Titolo A-Z</option>
				<option value="title-desc">Titolo Z-A</option>
				<option value="category-asc">Categoria A-Z</option>
				<option value="category-desc">Categoria Z-A</option>
			</select>
		</div>
	);
}