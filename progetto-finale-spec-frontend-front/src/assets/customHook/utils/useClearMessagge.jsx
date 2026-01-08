import { useState, useRef } from "react";

export function useClearListMessage(
  defaultMsg = "Lista svuotata!",
  timeout = 1500
) {
  const [msg, setMsg] = useState("");
  const timer = useRef();

  const clearList = (clearFn, customMsg) => {
    clearFn();
    if (timer.current) clearTimeout(timer.current);
    setMsg(customMsg || defaultMsg);
    timer.current = setTimeout(() => setMsg(""), timeout);
  };

  return [msg, clearList];
}
