import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CartButton from "../assets/components/CartButton";
import FavoriteButton from "../assets/components/FavoriteButton";

function Navbar() {
	const location = useLocation();
	const [open, setOpen] = useState(false);

	const handleToggle = () => setOpen(o => !o);

	return (
		<nav className="navbar navbar-expand-lg custom-navbar mr-4">
			<div className="container-fluid">
				{/* Logo a sinistra */}
				<Link className="navbar-brand d-flex align-items-center" to="/">
					<div className="logo">
						<img src="/logo4.png" alt="JohnPepper Logo" width="48" height="48" className="me-2 " />
					</div>
					<span className="fw-bold d-none display-4 d-md-inline">JohnPepper</span>
				</Link>
				{/* Hamburger per mobile */}
				<button
					className={`navbar-toggler${open ? "" : " collapsed"}`}
					type="button"
					aria-controls="navbarNav"
					aria-expanded={open}
					aria-label="Toggle navigation"
					onClick={handleToggle}
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				{/* Menu centrale */}
				<div className={`collapse navbar-collapse${open ? " show" : ""}`} id="navbarNav">
					<ul className="navbar-nav mx-auto w-100 align-items-center justify-content-center ">
						<li className="nav-item d-flex align-items-center  w-100 d-lg-none" style={{ gap: "8px" }}>
							<div className="d-flex flex-grow-1">
								<Link className={`nav-link${location.pathname === "/" ? " active" : ""}`} to="/" onClick={() => setOpen(false)}>Home</Link>
							</div>
							<FavoriteButton navbar />
							<CartButton />
						</li>
						<li className="nav-item d-flex align-items-center justify-content-between w-100 d-lg-none" style={{ gap: "8px" }}>
							<div className="d-flex flex-grow-1">
								<Link className={`nav-link${location.pathname === "/category/freschi" ? " active" : ""}`} to="/category/freschi" onClick={() => setOpen(false)}>Prodotti</Link>
							</div>
						</li>
						<li className="nav-item d-flex align-items-center justify-content-between w-100 d-lg-none" style={{ gap: "8px" }}>
							<div className="d-flex flex-grow-1">
								<Link className={`nav-link${location.pathname === "/compare" ? " active" : ""}`} to="/compare" onClick={() => setOpen(false)}>Comparatore</Link>
							</div>
						</li>
						{/* Versione desktop: solo i link, niente emoticon */}
						<li className="nav-item d-none d-lg-block">
							<Link className={`nav-link${location.pathname === "/" ? " active" : ""}`} to="/">Home</Link>
						</li>
						<li className="nav-item d-none d-lg-block">
							<Link className={`nav-link${location.pathname === "/category/freschi" ? " active" : ""}`} to="/products">Prodotti</Link>
						</li>
						<li className="nav-item d-none d-lg-block">
							<Link className={`nav-link${location.pathname === "/compare" ? " active" : ""}`} to="/compare">Comparatore</Link>
						</li>
					</ul>
					{/* Emoticon solo desktop */}
					<ul className="navbar-nav mb-2 mb-lg-0 ms-auto d-none d-lg-flex flex-row align-items-center">
						<li className="nav-item me-2">
							<FavoriteButton navbar />
						</li>
						<li className="nav-item">
							<CartButton />
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;