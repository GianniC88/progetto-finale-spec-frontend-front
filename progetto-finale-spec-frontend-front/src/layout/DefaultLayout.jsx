import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "../Layout/Footer";

export default function DefaultLayout() {
	return (
		<>
			<header>
				<NavBar />
			</header>

			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
}