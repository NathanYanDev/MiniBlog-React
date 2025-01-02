// Importing styles
import "./App.css";

// Importing react-router related modules
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

// Importing Firebase modules
import { onAuthStateChanged } from "firebase/auth";

// Importing Hooks, Context and functions
import { AuthProvider } from "./context/AuthContext.tsx";
import { useAuthentication } from "./hooks/useAuthentication.ts";
import { useEffect, useState } from "react";

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
	// State to store the user
	const [user, setUser] = useState<User | undefined | null>(undefined);

	// Custom hook to get the auth object from Firebase
	const { auth } = useAuthentication();

	// State to store the loading status
	const [loading, setLoading] = useState(true);

	// Simulating a loading time of 3 seconds
	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 3000);
	}, []);

	// Listening to the auth state changes
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setUser(user);
		});
	}, [auth]);

	// If the loading is true, show the loading component
	if (loading) {
		return <Loading />;
	}

	return (
		<div className="w-full">
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
		</div>
	);
}
