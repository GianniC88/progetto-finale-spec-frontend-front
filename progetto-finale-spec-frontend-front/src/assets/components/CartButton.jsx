import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Link } from "react-router-dom";

export default function CartButton({ prodottoId }) {
	const { addToCart, removeFromCart, isInCart, cart } = useContext(GlobalContext);

	if (prodottoId) {
		const selected = isInCart && isInCart(prodottoId);
		const quantity = cart.filter(id => id === prodottoId).length;

		const handleClick = () => {
			if (selected) {
				removeFromCart(prodottoId);
			} else {
				addToCart(prodottoId);
			}
		};

		return (
			<button
				onClick={handleClick}
				title={selected ? "Rimuovi dal carrello" : "Aggiungi al carrello"}
				className="cart-btn"
			>
				{quantity > 0 && (
					<span className="cart-badge">
						{quantity}
					</span>
				)}
				<span
					role="img"
					aria-label="Carrello"
					className="cart-navbar-icon"
					style={{
						filter: selected ? "grayscale(0%)" : "grayscale(60%)",
						opacity: selected ? 2 : 0.5,
						fontSize: "1em",
						transition: "filter 0.2s, opacity 0.2s"
					}}
				>
					🛒
				</span>
			</button>
		);
	}

	return (
		<Link to="/cart" className="nav-link position-relative" title="Vai al carrello">
			<span
				role="img"
				aria-label="Carrello"
				className="cart-navbar-icon"
				style={{
					fontSize: "2.5em" // aumenta la dimensione qui!
				}}
			>
				🛒
			</span>
			{(cart && cart.length > 0) && (
				<span className="cart-badge-total">
					{cart.length}
				</span>
			)}
		</Link>
	);
}