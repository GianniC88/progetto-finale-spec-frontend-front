import { useState, useRef } from "react";

export function useActionMessage(timeout = 1500) {
  const [msg, setMsg] = useState("");

  const timer = useRef();

  const showMsg = (action, quantity) => {
    if (timer.current) clearTimeout(timer.current);
    if (action === "add") setMsg("Prodotto aggiunto al carrello!");
    else if (action === "remove" && quantity > 1)
      setMsg(`Prodotti rimossi dal carrello! (${quantity})`);
    else if (action === "remove") setMsg("Prodotto rimosso dal carrello!");
    timer.current = setTimeout(() => setMsg(""), timeout);
  };

  return [msg, showMsg];
}
