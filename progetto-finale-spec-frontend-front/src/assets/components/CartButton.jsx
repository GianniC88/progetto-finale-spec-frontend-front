import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Link } from "react-router-dom";

export default function CartButton({ prodottoId }) {
	const { addToCart, removeFromCart, isInCart, cart } = useContext(GlobalContext);
	const [msg, setMsg] = useState("");

	if (prodottoId) {
		const selected = isInCart && isInCart(prodottoId);
		const quantity = cart.filter(id => id === prodottoId).length;

		const handleClick = () => {
			if (selected) {
				removeFromCart(prodottoId);
				if (quantity > 1) {
					setMsg(`Prodotti rimossi dal carrello! (${quantity})`);
				} else {
					setMsg("Prodotto rimosso dal carrello!");
				}
			} else {
				addToCart(prodottoId);
				setMsg("Prodotto aggiunto al carrello!");
			}
			setTimeout(() => setMsg(""), 1500);
		};

		return (
			<>
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
				{msg && (
					<div className="carrello-modal-banner">
						{msg}
					</div>
				)}
			</>
		);
	}

	return (
		<Link to="/cart" className="nav-link position-relative" title="Vai al carrello">
			<span
				role="img"
				aria-label="Carrello"
				className="cart-navbar-icon"
				style={{
					fontSize: "2.5em"
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