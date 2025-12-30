import { Link, useLocation } from "react-router-dom";


function Navbar() {
	const location = useLocation();

	return (
		<nav className="navbar navbar-expand-lg custom-navbar">
			<div className="container-fluid">
				{/* Logo a sinistra */}
				<Link className="navbar-brand d-flex align-items-center" to="/">
					<div className="logo">
						<img src="/logo4.png" alt="JohnPepper Logo" width="48" height="48" className="me-2 " />
					</div>
					<span className="fw-bold d-none display-4 d-md-inline">JohnPepper</span>
				</Link>
				{/* Hamburger per mobile */}
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
					aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				{/* Menu centrale */}
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav mx-auto">
						<li className="nav-item">
							<Link className={`nav-link${location.pathname === "/" ? " active" : ""}`} to="/">Home</Link>
						</li>

						<li className="nav-item">
							<Link className={`nav-link${location.pathname === "/category/freschi" ? " active" : ""}`} to="/category/freschi">Prodotti</Link>
						</li>

						<li className="nav-item">
							<Link className={`nav-link${location.pathname === "/compare" ? " active" : ""}`} to="/compare">Comparatore</Link>
						</li>
					</ul>
					{/* Search e icone a destra */}
					<form className="d-flex me-3" role="search">
						<input className="form-control me-2" type="search" placeholder="Cerca" aria-label="Cerca" />
					</form>
					<ul className="navbar-nav mb-2 mb-lg-0">
						<li className="nav-item">
							<Link className={`nav-link${location.pathname === "/favorites" ? " active" : ""}`} to="/favorites">
								<span role="img" aria-label="Preferiti">❤️</span>
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/cart">
								<span role="img" aria-label="Carrello">🛒</span>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav >
	);
}

export default Navbar;