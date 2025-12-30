import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CardDetail from "../assets/components/CardDetail";

const Detail = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [prodotto, setProdotto] = useState(null);
	const [errore, setErrore] = useState(null);

	// Carica da localStorage se non c'è id
	useEffect(() => {
		if (!id) {
			const saved = localStorage.getItem("lastProduct");
			if (saved) setProdotto(JSON.parse(saved));
			return;
		}
		setErrore(null);
		setProdotto(null);
		const apiUrl = import.meta.env.VITE_API_URL;
		fetch(`${apiUrl}/products/${id}`)
			.then((res) => {
				if (!res.ok) throw new Error("Prodotto non trovato");
				return res.json();
			})
			.then((data) => {
				if (data && data.success && data.product) {
					setProdotto(data.product);
					localStorage.setItem("lastProduct", JSON.stringify(data.product));
				} else {
					setProdotto(null);
					setErrore("Prodotto non trovato");
				}
			})
			.catch(() => {
				setProdotto(null);
				setErrore("Prodotto non trovato");
			});
	}, [id]);

	return (
		<div className="detail-page">
			<h1>Dettaglio Prodotto</h1>
			{errore ? (
				<div style={{ color: "red" }}>{errore}</div>
			) : prodotto ? (
				<CardDetail prodotto={prodotto} />
			) : (
				<div>
					<span
						style={{ color: "#ff9800", cursor: "pointer", textDecoration: "underline" }}
						onClick={() => navigate("/category/freschi")}
					>
						Scegli un prodotto
					</span>
				</div>
			)}
		</div>
	);
};

export default Detail;