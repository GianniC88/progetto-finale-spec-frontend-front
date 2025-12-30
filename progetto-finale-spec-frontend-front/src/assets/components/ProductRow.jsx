import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import FavoriteButton from "./FavoriteButton";

export default function ProductRow({ prodotto }) {
	const { toggleFavorite, isFavorite, addToCart, addToCompare, isCompared } = useContext(GlobalContext);

	const [msg, setMsg] = useState("");

	const handleCompare = () => {
		addToCompare(prodotto.id);
		setMsg("Prodotto aggiunto al comparatore!");
		setTimeout(() => setMsg(""), 1500);
	};

	return (
		<tr>
			<td>
				<Link
					to={`/products/${prodotto.id}`}
					style={{ color: "inherit", textDecoration: "none" }}
				>
					{prodotto.title}
				</Link>
			</td>
			<td>{prodotto.category}</td>
			<td>
				{/* Preferiti */}
				<FavoriteButton prodottoId={prodotto.id} />

				{/* Carrello */}
				<button
					onClick={() => addToCart(prodotto.id)}
					title="Aggiungi al carrello"
					style={{ background: "none", border: "none", fontSize: "1.2em", cursor: "pointer" }}
				>
					<span role="img" aria-label="Carrello">🛒</span>
				</button>
				{/* Comparatore */}
				<button
					onClick={handleCompare}
					title="Aggiungi al comparatore"
					style={{ background: "none", border: "none", fontSize: "1.2em", cursor: "pointer" }}
				>
					{isCompared && isCompared(prodotto.id) ? "✔️" : "⇄"}
				</button>
				{/* Messaggio */}
				{msg && (
					<span style={{ marginLeft: "10px", color: "green", fontSize: "0.9em" }}>
						{msg}
					</span>
				)}
			</td>
		</tr >
	);
}