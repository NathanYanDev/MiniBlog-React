// Importing styles
import "./App.css";

// Importing react-router related modules
import { BrowserRouter, Route, Routes } from "react-router";

import { Footer } from "./components/Footer.tsx";
import { Navbar } from "./components/Navbar.tsx";
// Importing pages
import { About } from "./pages/About/About.tsx";
import { Home } from "./pages/Home/Home.tsx";

export function App() {
	return (
		<div className="w-full">
			<BrowserRouter>
				<Navbar />
				<div className="container h-screen mt-3">
					<Routes>
						<Route index element={<Home />} />
						<Route path="/about" element={<About />} />
					</Routes>
				</div>
				<Footer />
			</BrowserRouter>
		</div>
	);
}
