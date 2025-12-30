import { useEffect, useState } from "react";
import ProductRow from "../assets/components/ProductRow";

export default function ListaProdotti() {
	const [prodotti, setProdotti] = useState([]);
	const [search, setSearch] = useState("");
	const [category, setCategory] = useState("");
	const [sort, setSort] = useState("title-asc");
	const [categorie, setCategorie] = useState([]);

	useEffect(() => {
		const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
		let url = `${apiUrl}/products?`;
		if (search) url += `search=${encodeURIComponent(search)}&`;
		if (category) url += `category=${encodeURIComponent(category)}&`;

		fetch(url)
			.then(res => res.json())
			.then(data => {
				const all = data.products || data;
				// Ricava le categorie disponibili
				setCategorie([...new Set(all.map(p => p.category))]);
				// Ordina
				let ordinati = [...all];
				if (sort === "title-asc") ordinati.sort((a, b) => a.title.localeCompare(b.title));
				if (sort === "title-desc") ordinati.sort((a, b) => b.title.localeCompare(a.title));
				if (sort === "category-asc") ordinati.sort((a, b) => a.category.localeCompare(b.category));
				if (sort === "category-desc") ordinati.sort((a, b) => b.category.localeCompare(a.category));
				setProdotti(ordinati);
			});
	}, [search, category, sort]);

	return (
		<div className="container my-4">
			<h2>Lista Prodotti</h2>
			<div className="mb-3 d-flex gap-2 flex-wrap">
				<input
					type="text"
					placeholder="Cerca per titolo..."
					value={search}
					onChange={e => setSearch(e.target.value)}
					className="form-control"
					style={{ maxWidth: 200 }}
				/>
				<select
					value={category}
					onChange={e => setCategory(e.target.value)}
					className="form-select"
					style={{ maxWidth: 200 }}
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
					style={{ maxWidth: 200 }}
				>
					<option value="title-asc">Titolo A-Z</option>
					<option value="title-desc">Titolo Z-A</option>
					<option value="category-asc">Categoria A-Z</option>
					<option value="category-desc">Categoria Z-A</option>
				</select>
			</div>
			<table className="table">
				<thead>
					<tr>
						<th>Titolo</th>
						<th>Categoria</th>
					</tr>
				</thead>
				<tbody>
					{prodotti.length === 0 && (
						<tr>
							<td colSpan={2}>Nessun prodotto trovato.</td>
						</tr>
					)}
					{prodotti.map(prodotto => (
						<ProductRow prodotto={prodotto} key={prodotto.id} />
					))}
				</tbody>
			</table>
		</div>
	);
}