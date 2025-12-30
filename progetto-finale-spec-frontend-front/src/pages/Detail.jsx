import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardDetail from "../assets/components/CardDetail";


const Detail = () => {
	const { id } = useParams();
	const [prodotto, setProdotto] = useState(null);
	const [errore, setErrore] = useState(null);

	useEffect(() => {
		setErrore(null);
		setProdotto(null);
		const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
		fetch(`${apiUrl}/products/${id}`)
			.then((res) => {
				if (!res.ok) throw new Error("Prodotto non trovato");
				return res.json();
			})
			.then((data) => {
				if (data && data.success && data.product) {
					setProdotto(data.product);
				} else {
					setProdotto(null);
					setErrore("Prodotto non trovato");
				}
			})
			.catch((err) => {
				setProdotto(null);
				setErrore("Prodotto non trovato");
			});
	}, [id]);

	return (
		<div className="detail-page">
			<h1>Dettaglio Prodotto</h1>
			{errore ? (
				<div style={{ color: "red" }}>{errore}</div>
			) : (
				<CardDetail prodotto={prodotto} />
			)}
		</div>
	);
};

export default Detail;
