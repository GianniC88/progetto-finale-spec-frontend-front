import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "../layout/Footer";

export default function DefaultLayout() {
	return (
		<div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
			<header>
				<NavBar />
			</header>
			<main style={{ flex: 1 }}>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}