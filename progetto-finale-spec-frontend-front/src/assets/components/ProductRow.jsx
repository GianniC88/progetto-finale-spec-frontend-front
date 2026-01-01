import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import FavoriteButton from "./FavoriteButton";
import CartButton from "./CartButton";
import ButtonAddRemove from "./ButtonAddRemove";
import CompareButton from "./CompareButton";
import { useActionMessage } from "../customHook/useActionMessage";

export default function ProductRow({ prodotto }) {
  const { addToCompare, isCompared } = useContext(GlobalContext);
  const [msg, showMsg] = useActionMessage();

  return (
    <tr className="product-row">
      <td className="product-title-cell">
        <Link
          to={`/products/${prodotto.id}`}
          className="product-title-link"
          title={prodotto.title}
        >
          {prodotto.title}
        </Link>
      </td>
      <td className="product-category-cell">{prodotto.category}</td>
      <td className="product-favorite-cell">
        <FavoriteButton prodottoId={prodotto.id} />
      </td>
      <td className="product-cart-cell">
        <CartButton prodottoId={prodotto.id} />
      </td>
      <td className="product-addremove-cell">
        <ButtonAddRemove prodottoId={prodotto.id} onAction={showMsg} />
        {msg && <span className="compare-msg">{msg}</span>}
      </td>
      <td className="product-compare-cell">
        <CompareButton prodottoId={prodotto.id} />
        {msg && <span className="compare-msg">{msg}</span>}
      </td>
    </tr>
  );
}
