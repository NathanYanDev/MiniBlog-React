// Importing styles
import "./App.css";

// Importing react-router related modules
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
// Importing Hooks, Context and functions
import { AuthProvider } from "./context/AuthContext.tsx";
import { useAuthentication } from "./hooks/useAuthentication.ts";

// Importing components
import { Footer } from "./components/Footer.tsx";
import { Navbar } from "./components/Navbar.tsx";
import { Loading } from "./components/Loading.tsx";

// Importing pages
import { About } from "./pages/About/About.tsx";
import { CreatePost } from "./pages/CreatePost/CreatePost.tsx";
import { Dashboard } from "./pages/Dashboard/Dashboard.tsx";
import { Home } from "./pages/Home/Home.tsx";
import { Login } from "./pages/Login/Login.tsx";
import { Register } from "./pages/Register/Register.tsx";
import { Search } from "./pages/Search/Search.tsx";
import { Post } from "./pages/Post/Post.tsx";
import { EditPost } from "./pages/EditPost/EditPost.tsx";

// Importing User Type from Firebase
import type { User } from "firebase/auth";

export function App() {
	const [user, setUser] = useState<User | undefined | null>(undefined);
	const { auth } = useAuthentication();
	const [loading, setLoading] = useState(true);

	const loadingUser = user === undefined;

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 3000);
	}, []);

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
			{loading ? (
				<Loading />
			) : (
				<AuthProvider value={{ user }}>
					<BrowserRouter>
						<Navbar />
						<main className="min-h-screen mt-3">
							<Routes>
								<Route index element={<Home />} />
								<Route path="/about" element={<About />} />
								<Route path="/search" element={<Search />} />
								<Route path="/posts/:id" element={<Post />} />
								<Route
									path="/login"
									element={
										!user ? (
											<Login />
										) : (
											<Navigate to={"/"} />
										)
									}
								/>
								<Route
									path="/register"
									element={
										!user ? (
											<Register />
										) : (
											<Navigate to={"/"} />
										)
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
									path="/posts/edit/:id"
									element={
										user ? (
											<EditPost />
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
						</main>
						<Footer />
					</BrowserRouter>
				</AuthProvider>
			)}
		</div>
	);
}
