import { useContext, useState, useRef } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Link } from "react-router-dom";

export default function FavoriteButton({ prodottoId, navbar }) {
	const { toggleFavorite, isFavorite, favoriteList } = useContext(GlobalContext);
	const [msg, setMsg] = useState("");
	const timerRef = useRef(null);

	// Versione per la navbar
	if (navbar) {
		return (
			<Link to="/favorites" className="nav-link position-relative" title="Vai ai preferiti">
				<span
					role="img"
					aria-label="Preferiti"
					className="cart-navbar-icon"
					style={{
						fontSize: "2.5em"
					}}
				>
					❤️
				</span>
				{favoriteList && favoriteList.length > 0 && (
					<span className="cart-badge-total">
						{favoriteList.length}
					</span>
				)}
			</Link>
		);
	}

	// Versione standard (per la tabella)
	const isSelected = isFavorite(prodottoId);

	const handleClick = () => {
		toggleFavorite(prodottoId);
		clearTimeout(timerRef.current);
		setMsg(isSelected ? "Rimosso dai Preferiti" : "Aggiunto ai Preferiti");
		timerRef.current = setTimeout(() => setMsg(""), 1500);
	};

	return (
		<>
			<button
				onClick={handleClick}
				title={isSelected ? "Già nei preferiti" : "Aggiungi ai preferiti"}
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
			{msg && (
				<div className="carrello-modal-banner">
					{msg}
				</div>
			)}
		</>
	);
}