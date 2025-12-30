import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

export default function FavoriteButton({ prodottoId }) {
	const { toggleFavorite, isFavorite } = useContext(GlobalContext);
	const isSelected = isFavorite(prodottoId);

	return (
		<button
			onClick={() => toggleFavorite(prodottoId)}
			title="Aggiungi ai preferiti"
			style={{
				background: "none",
				border: "none",
				fontSize: "1.2em",
				cursor: "pointer",
				transition: "color 0.2s"
			}}
		>
			<span role="img" aria-label="Preferiti">
				{isSelected ? "❤️" : "🤍"}
			</span>
		</button>
	);
}