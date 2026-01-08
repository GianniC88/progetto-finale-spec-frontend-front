import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CardDetail from "../assets/components/CardDetail";
import useFetchDetail from "../assets/customHook/detail/useFetchDetail";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { prodotto, errore } = useFetchDetail(id);

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
            style={{
              color: "#ff9800",
              cursor: "pointer",
              textDecoration: "underline",
            }}
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
