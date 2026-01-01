import { useContext, useRef, useState, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";

export default function ButtonAddRemove({ prodottoId, quantity }) {
	const { addToCart, decreaseFromCart } = useContext(GlobalContext);
	const [msg, setMsg] = useState("");
	const actionRef = useRef(null);
	const lastAction = useRef(null); // "add" o "remove"

	useEffect(() => {
		// Mostra il banner solo se c'è stata un'azione
		if (lastAction.current === "add") {
			setMsg(`Prodotti aggiunti (${quantity})`);
			const t = setTimeout(() => setMsg(""), 1500);
			return () => clearTimeout(t);
		}
		if (lastAction.current === "remove") {
			setMsg(`Prodotti rimossi (${quantity})`);
			const t = setTimeout(() => setMsg(""), 1500);
			return () => clearTimeout(t);
		}
	}, [quantity]);

	const handleAdd = () => {
		lastAction.current = "add";
		addToCart(prodottoId);
	};

	const handleRemove = () => {
		lastAction.current = "remove";
		decreaseFromCart(prodottoId);
	};

	return (
		<div className="d-flex justify-content-center align-items-center" style={{ gap: "6px", position: "relative" }}>
			<div style={{ display: "flex", flexDirection: "column", gap: "2px", marginLeft: "20px" }}>
				<button
					className="btn btn-outline-secondary"
					onClick={handleAdd}
					style={{ minWidth: 18, fontSize: "0.85em", padding: "1px 6px", lineHeight: 1 }}
					title="Aggiungi"
				>
					+
				</button>
				<button
					className="btn btn-outline-secondary"
					onClick={handleRemove}
					style={{ minWidth: 18, fontSize: "0.85em", padding: "1px 6px", lineHeight: 1 }}
					disabled={quantity <= 1}
					title="Diminuisci"
				>
					-
				</button>
			</div>
			<span style={{ fontSize: "0.95em", marginLeft: "4px" }}>{quantity}</span>
			{msg && (
				<div className="carrello-modal-banner" style={{ top: "50px", left: "50%", transform: "translateX(-50%)" }}>
					{msg}
				</div>
			)}
		</div>
	);
}