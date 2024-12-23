// Importing styles
import "./App.css";

// Importing react-router related modules
import { BrowserRouter, Route, Routes } from "react-router";

import { Footer } from "./components/Footer.tsx";
import { Navbar } from "./components/Navbar.tsx";
// Importing pages
import { About } from "./pages/About/About.tsx";
import { Home } from "./pages/Home/Home.tsx";
import { Login } from "./pages/Login/Login.tsx";
import { Register } from "./pages/Register/Register.tsx";

export function App() {
	return (
		<div className="w-full">
			<BrowserRouter>
				<Navbar />
				<div className="h-screen mt-3">
					<Routes>
						<Route index element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
					</Routes>
				</div>
				<Footer />
			</BrowserRouter>
		</div>
	);
}
