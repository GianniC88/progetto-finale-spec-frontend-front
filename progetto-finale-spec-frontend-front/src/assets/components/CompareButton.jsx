import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";

export default function CompareButton({ prodottoId }) {
	const { addToCompare, removeFromCompare, isCompared } = useContext(GlobalContext);
	const [msg, setMsg] = useState("");

	const handleClick = () => {
		if (isCompared && isCompared(prodottoId)) {
			removeFromCompare(prodottoId);
			setMsg("Prodotto rimosso dal comparatore!");
		} else {
			addToCompare(prodottoId);
			setMsg("Prodotto aggiunto al comparatore!");
		}
		setTimeout(() => setMsg(""), 1500);
	};

	return (
		<>
			<button
				onClick={handleClick}
				title={isCompared && isCompared(prodottoId) ? "Rimuovi dal comparatore" : "Aggiungi al comparatore"}
				className="compare-btn"
			>
				{isCompared && isCompared(prodottoId) ? "✔️" : "⇄"}
			</button>
			{msg && (
				<span className="compare-msg">{msg}</span>
			)}
		</>
	);
}