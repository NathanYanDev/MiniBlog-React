// Importing styles
import "./App.css";

// Importing react-router related modules
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

// Importing Hooks, Context and functions
import { AuthProvider } from "./context/AuthContext.tsx";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthentication } from "./hooks/useAuthentication.ts";
import { useEffect, useState } from "react";

// Importing components
import { Footer } from "./components/Footer.tsx";
import { Navbar } from "./components/Navbar.tsx";

// Importing pages
import { About } from "./pages/About/About.tsx";
import { CreatePost } from "./pages/CreatePost/CreatePost.tsx";
import { Dashboard } from "./pages/Dashboard/Dashboard.tsx";
import { Home } from "./pages/Home/Home.tsx";
import { Login } from "./pages/Login/Login.tsx";
import { Register } from "./pages/Register/Register.tsx";

// Importing User Type from Firebase
import type { User } from "firebase/auth";

export function App() {
	const [user, setUser] = useState<User | undefined | null>(undefined);
	const { auth } = useAuthentication();

	const loadingUser = user === undefined;

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setUser(user);
		});
	}, [auth]);

	if (loadingUser && user != null) {
		return <p>Carregando...</p>;
	}

	return (
		<div className="w-full">
			<AuthProvider value={{ user }}>
				<BrowserRouter>
					<Navbar />
					<div className="h-screen mt-3">
						<Routes>
							<Route index element={<Home />} />
							<Route path="/about" element={<About />} />
							<Route
								path="/login"
								element={
									!user ? <Login /> : <Navigate to={"/"} />
								}
							/>
							<Route
								path="/register"
								element={
									!user ? <Register /> : <Navigate to={"/"} />
								}
							/>
							<Route
								path="/dashboard"
								element={
									user ? (
										<Dashboard />
									) : (
										<Navigate to={"/login"} />
									)
								}
							/>
							<Route
								path="/posts/create"
								element={
									user ? (
										<CreatePost />
									) : (
										<Navigate to={"/login"} />
									)
								}
							/>
						</Routes>
					</div>
					<Footer />
				</BrowserRouter>
			</AuthProvider>
		</div>
	);
}
