import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import ButtonAddRemove from "../assets/components/ButtonAddRemove";
export default function Carrello() {

	const { cart, removeFromCart, addToCart, decreaseFromCart } = useContext(GlobalContext);
	const [dettagli, setDettagli] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState([]);

	// Conta le occorrenze di ogni prodotto nel carrello
	const cartCount = cart.reduce((acc, id) => {
		acc[id] = (acc[id] || 0) + 1;
		return acc;
	}, {});

	useEffect(() => {
		const apiUrl = import.meta.env.VITE_API_URL;
		if (cart.length === 0) {
			setDettagli([]);
			setLoading(false);
			return;
		}
		const uniqueIds = [...new Set(cart)];
		Promise.all(
			uniqueIds.map(id =>
				fetch(`${apiUrl}/products/${id}`)
					.then(res => res.json())
					.then(data => data.product || data)
			)
		).then(prodotti => {
			setDettagli(prodotti);
			setLoading(false);
		});
	}, [cart]);

	const handleSelect = id => {
		setSelected(sel =>
			sel.includes(id) ? sel.filter(x => x !== id) : [...sel, id]
		);
	};

	const handleRemoveSelected = () => {
		selected.forEach(id => removeFromCart(id));
		setSelected([]);
	};

	// Calcola il totale
	const totale = dettagli.reduce((sum, prodotto) => {
		const qty = cartCount[prodotto.id] || 0;
		const prezzo = Number(prodotto.price) || 0;
		return sum + qty * prezzo;
	}, 0);

	return (
		<div className="container my-4">
			<h2>Carrello</h2>
			{loading ? (
				<div>Caricamento...</div>
			) : dettagli.length === 0 ? (
				<div>Il carrello è vuoto.</div>
			) : (
				<>
					<table className="table table-sm align-middle" style={{ width: "100%" }}>
						<colgroup>
							<col style={{ width: "4%" }} />
							<col style={{ width: "36%" }} />
							<col style={{ width: "15%" }} />
							<col style={{ width: "15%" }} />
							<col style={{ width: "15%" }} />
							<col style={{ width: "15%" }} />
						</colgroup>
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
						<tbody>
							{dettagli.map(prodotto => (
								<tr key={prodotto.id}>
									<td style={{ textAlign: "center" }}>
										<input
											type="checkbox"
											checked={selected.includes(prodotto.id)}
											onChange={() => handleSelect(prodotto.id)}
										/>
									</td>
									<td>
										<div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
											<img
												src={prodotto.image}
												alt={prodotto.title}
												style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 6 }}
											/>
											<span style={{ fontSize: "1.1em" }}>{prodotto.title}</span>
										</div>
									</td>
									<td style={{ textAlign: "center" }}>
										{prodotto.price ? `${prodotto.price} €` : "-"}
									</td>
									<td style={{ textAlign: "center", verticalAlign: "middle" }}>
										<ButtonAddRemove prodottoId={prodotto.id} quantity={cartCount[prodotto.id]} />
									</td>
									<td style={{ textAlign: "center" }}>
										{prodotto.price
											? `${(cartCount[prodotto.id] * prodotto.price).toFixed(2)} €`
											: "-"}
									</td>
									<td style={{ textAlign: "center", verticalAlign: "middle" }}>
										<div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>

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
					<button
						className="btn btn-danger btn-sm mt-2"
						onClick={handleRemoveSelected}
						disabled={selected.length === 0}
					>
						Rimuovi selezionati
					</button>
					<div className="mt-3">
						<strong>Totale prodotti:</strong> {cart.length}<br />
						<strong>Totale carrello:</strong> {totale.toFixed(2)} €
					</div>
				</>
			)}
		</div>
	);
}