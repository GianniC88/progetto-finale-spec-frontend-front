import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import FavoriteButton from "./FavoriteButton";
import CartButton from "./CartButton";
import ButtonAddRemove from "./ButtonAddRemove";
import CompareButton from "./CompareButton";
import { useActionMessage } from "../customHook/utils/useActionMessage";

export default function ProductRow({ prodotto }) {
  // Qui usiamo soprattutto `prodotto.id`, `prodotto.title` e `prodotto.category`.
  const { addToCompare, isCompared } = useContext(GlobalContext);

  // Hook per mostrare un messaggio temporaneo dopo un'azione (es. aggiunta/rimozione).
  // `msg` = testo del messaggio, `showMsg` = funzione da chiamare quando vuoi mostrarlo.
  const [msg, showMsg] = useActionMessage();

  return (
    // Una riga della tabella prodotti
    <tr className="product-row">
      <td className="product-title-cell">
        {/* Link al dettaglio del prodotto */}
        <Link
          to={`/products/${prodotto.id}`}
          className="product-title-link"
          title={prodotto.title}
        >
          {prodotto.title}
        </Link>
      </td>
      {/* Categoria prodotto */}
      <td className="product-category-cell">{prodotto.category}</td>
      <td className="product-favorite-cell">
        {/* Bottone preferiti: riceve l'id del prodotto */}
        <FavoriteButton prodottoId={prodotto.id} />
      </td>
      <td className="product-cart-cell">
        {/* Bottone carrello: toggle add/remove e badge quantità */}
        <CartButton prodottoId={prodotto.id} />
      </td>
      <td className="product-addremove-cell">
        {/* +/- quantità: quando compi un'azione chiama `onAction` per mostrare `msg` */}
        <ButtonAddRemove prodottoId={prodotto.id} onAction={showMsg} />
        {/* Feedback testuale (se presente) */}
        {msg && <span className="compare-msg">{msg}</span>}
      </td>
      <td className="product-compare-cell">
        {/* Bottone confronto: aggiunge/rimuove dalla lista compare */}
        <CompareButton prodottoId={prodotto.id} />
        {/* Feedback testuale (se presente) */}
        {msg && <span className="compare-msg">{msg}</span>}
      </td>
    </tr>
  );
}
