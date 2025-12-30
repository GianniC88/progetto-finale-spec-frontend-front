import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

export default function CartButton({ prodottoId }) {
	const { addToCart, removeFromCart, isInCart, cart } = useContext(GlobalContext);
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
			style={{
				background: "none",
				border: "none",
				fontSize: "1.6em",
				cursor: "pointer",
				position: "relative",
				transition: "color 0.2s"
			}}
		>
			{/* Badge quantità */}
			{quantity > 0 && (
				<span style={{
					position: "absolute",
					top: "-8px",
					right: "-8px",
					background: "#ff9800",
					color: "#fff",
					borderRadius: "50%",
					fontSize: "0.7em",
					padding: "2px 6px",
					fontWeight: "bold",
					zIndex: 1
				}}>
					{quantity}
				</span>
			)}
			{/* Icona carrello */}
			<svg
				width="1.3em"
				height="1.3em"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				style={{
					verticalAlign: "middle"
				}}
			>
				<circle cx="9" cy="21" r="1.5" fill={selected ? "#ff9800" : "#888"} />
				<circle cx="17" cy="21" r="1.5" fill={selected ? "#ff9800" : "#888"} />
				<path
					d="M7 18h10l3.2-10H6.2"
					stroke={selected ? "#ff9800" : "#888"}
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M6 6V4a2 2 0 0 1 2-2h1.5a2 2 0 0 1 2 2v2"
					stroke={selected ? "#ff9800" : "#888"}
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</button>
	);
}