import React from "react";

export default function CompareModal({ show, onClose, prodotti }) {
	if (!show) return null;

	return (
		<div
			className="modal"
			style={{
				display: "block",
				background: "rgba(0,0,0,0.5)",
				position: "fixed",
				top: 0,
				left: 0,
				width: "100vw",
				height: "100vh",
				zIndex: 9999,
			}}
			onClick={onClose}
		>
			<div
				className="modal-dialog"
				style={{
					maxWidth: "900px",
					margin: "60px auto",
					background: "#fff",
					borderRadius: "12px",
					padding: "2rem",
					position: "relative",
				}}
				onClick={e => e.stopPropagation()}
			>
				<button
					className="btn btn-danger"
					style={{ position: "absolute", top: 16, right: 16 }}
					onClick={onClose}
				>
					Chiudi
				</button>
				<h3 className="mb-4">Confronto dettagliato</h3>
				<table className="table table-bordered">
					<thead>
						<tr>
							<th>Caratteristica</th>
							{prodotti.map(p => (
								<th key={p.id}>{p.title}</th>
							))}
						</tr>
						<tr>
							<th></th>
							{prodotti.map(p => (
								<td key={p.id} style={{ textAlign: "center" }}>
									{p.image && (
										<img
											src={p.image}
											alt={p.title}
											style={{ maxWidth: "100px", maxHeight: "100px", objectFit: "contain" }}
										/>
									)}
								</td>
							))}
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Categoria</td>
							{prodotti.map(p => <td key={p.id}>{p.category}</td>)}
						</tr>
						<tr>
							<td>Prezzo</td>
							{prodotti.map(p => <td key={p.id}>{p.price} €</td>)}
						</tr>
						<tr>
							<td>Brand</td>
							{prodotti.map(p => <td key={p.id}>{p.brand}</td>)}
						</tr>
						<tr>
							<td>Piccantezza</td>
							{prodotti.map(p => <td key={p.id}>{p.spiciness}</td>)}
						</tr>
						<tr>
							<td>Descrizione</td>
							{prodotti.map(p => <td key={p.id}>{p.description}</td>)}
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}