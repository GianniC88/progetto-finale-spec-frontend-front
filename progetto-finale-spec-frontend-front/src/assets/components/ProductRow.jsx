import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import FavoriteButton from "./FavoriteButton";
import CartButton from "./CartButton";
import ButtonAddRemove from "./ButtonAddRemove";

export default function ProductRow({ prodotto }) {
	const { addToCompare, isCompared } = useContext(GlobalContext);
	const [msg, setMsg] = useState("");

	const handleCompare = () => {
		addToCompare(prodotto.id);
		setMsg("Prodotto aggiunto al comparatore!");
		setTimeout(() => setMsg(""), 1500);
	};

	return (
		<tr className="product-row">
			<td className="product-title-cell">
				<Link
					to={`/products/${prodotto.id}`}
					className="product-title-link"
					title={prodotto.title}
				>
					{prodotto.title}
				</Link>
			</td>
			<td className="product-category-cell">
				{prodotto.category}
			</td>
			<td className="product-actions-cell">
				<div className="product-actions">
					<FavoriteButton prodottoId={prodotto.id} />
					<CartButton prodottoId={prodotto.id} />
					<ButtonAddRemove prodottoId={prodotto.id} />
					<button
						onClick={handleCompare}
						title="Aggiungi al comparatore"
						className="compare-btn"
					>
						{isCompared && isCompared(prodotto.id) ? "✔️" : "⇄"}
					</button>
				</div>
				{msg && (
					<span className="compare-msg">
						{msg}
					</span>
				)}
			</td>
		</tr>
	);
}