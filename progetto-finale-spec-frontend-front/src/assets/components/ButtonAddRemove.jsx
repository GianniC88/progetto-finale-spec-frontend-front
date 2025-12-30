import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

export default function ButtonAddRemove({ prodottoId, quantity }) {
	const { addToCart, decreaseFromCart } = useContext(GlobalContext);

	return (
		<div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "6px" }}>
			<div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
				<button
					className="btn btn-outline-secondary"
					onClick={() => addToCart(prodottoId)}
					style={{ minWidth: 18, fontSize: "0.85em", padding: "1px 6px", lineHeight: 1 }}
				>
					+
				</button>
				<button
					className="btn btn-outline-secondary"
					onClick={() => decreaseFromCart(prodottoId)}
					style={{ minWidth: 18, fontSize: "0.85em", padding: "1px 6px", lineHeight: 1 }}
					disabled={quantity <= 1}
				>
					-
				</button>
			</div>
			<span style={{ fontSize: "0.95em", marginLeft: "4px" }}>{quantity}</span>
		</div>
	);
}