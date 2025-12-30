import { Link } from "react-router-dom";

export default function ProductRow({ prodotto }) {
	return (
		<tr>
			<td>
				<Link to={`/products/${prodotto.id}`}>
					{prodotto.title}
				</Link>
			</td>
			<td>{prodotto.category}</td>
		</tr>
	);
}