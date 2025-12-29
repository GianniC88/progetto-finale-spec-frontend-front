import ProdottiRandom from "../assets/components/Prodotti-random";


export default function Home() {

	return (
		<>
			<div className="img-background">
				<h1 className="fw-bold display-4 text-center">Peperoncini da tutto il mondo<br />freschi e lavorati</h1>
				<p className="text-center fw-normal">
					Esperienza e passione dal 2025 per portare la cultura del peperoncino <br />in tutte le varietà
					direttamente dalla nostra filiera <br /> dal seme ai lavorati.
				</p>

			</div>
			<div className="prodotti-random">
				<ProdottiRandom />
			</div >
			<div className="container">
				<div className="row g-a">
					<div className="col-12 col-md-4 p-3">
						<div className="card-img">
							<img src="/freschi/Mix di peperoncino fresco habanero 100gr.png" alt="mix habanero fresco" />
							<div className="category-card">

								<h2>Freschi</h2>
								<p>Scopri tutte le varietà di peperoncini freschi disponibili!</p>
							</div>
						</div>
					</div>



					<div className="col-12 col-md-4 p-3">
						<div className="card-img">
							<img src="/polveri/Polvere di Habanero (Box 3x12g)/tris-polvere-habanero-rosso-giallo-choco.png" alt="tris-polvere-habanero-rosso-giallo-choco" />
							<div className="category-card">
								<h2>Polveri</h2>
								<p>Le nostre polveri di peperoncino, per dare sapore a ogni piatto.</p>
							</div>
						</div>
					</div>
					<div className="col-12 col-md-4 p-3">
						<div className="card-img">
							<img src="/creme/Poker di Creme Carolina Reaper Red, Yellow, Chocolate e Caramel.png" alt="Poker di Creme Carolina Reaper Red, Yellow, Chocolate e Caramel" />
							<div className="category-card">
								<h2>Creme</h2>
								<p>Le migliori creme di peperoncino, pronte da spalmare o cucinare.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}