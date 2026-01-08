import Product from "../pages/Product.jsx";

export default function Home() {
  return (
    <div className="home-page">
      <div className="img-background">
        <h1 className="fw-bold display-4 text-center">
          Peperoncini da tutto il mondo
          <br />
          freschi e lavorati
        </h1>
        <p className="text-center fw-normal">
          Esperienza e passione dal 2025 per portare la cultura del peperoncino{" "}
          <br />
          in tutte le varietà direttamente dalla nostra filiera <br /> dal seme
          ai lavorati.
        </p>
      </div>
      <div className="prodotti-backgound">
        <Product />
      </div>
    </div>
  );
}
