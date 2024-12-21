// Importing styles
import "./App.css";

// Importing react-router related modules
import { BrowserRouter, Routes, Route } from "react-router";

// Importing pages
import { About } from "./pages/About/About.tsx";
import { Navbar } from "./components/Navbar.tsx";
import { Home } from "./pages/Home/Home.tsx";
import { Footer } from "./components/Footer.tsx";

export function App() {
	return (
		<div className="w-full">
			<BrowserRouter>
				<Navbar />
				<div className="container">
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
