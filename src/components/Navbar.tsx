// Importing shadcn component
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

// Importing React Router NavLink
import { NavLink, useLocation } from "react-router";

// Importing hooks and context
import { useAuthentication } from "@/hooks/useAuthentication";
import { useAuthValue } from "@/context/AuthContext";
import { useEffect, useState } from "react";

// Importing pages from constants and PageType from types
import { loggedPages, publicPages } from "@/constants/navigationPages";
import type { NamePagesType, PageType } from "@/types/navigationPages";

export const Navbar = () => {
	const { user } = useAuthValue();
	const { logout, getAvatar } = useAuthentication();
	const [avatar, setAvatar] = useState();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (user) {
			getAvatar(user.uid).then((data) => {
				if (data) {
					setAvatar(data.avatar);
				}
			});
		}
	}, [user]);

	// Creating a state to track which page is active
	const [activePage, setActivePage] = useState<NamePagesType>("Home");

	// Get location URL
	const location = useLocation();

	// Set the active page state with current path
	useEffect(() => {
		const path = location.pathname;
		if (path === "/") {
			setActivePage("Home");
		} else if (path === "/about") {
			setActivePage("About");
		} else if (path === "/posts/create") {
			setActivePage("Novo Post");
		} else if (path === "/dashboard") {
			setActivePage("Dashboard");
		} else if (path === "/login") {
			setActivePage("Login");
		} else if (path === "/register") {
			setActivePage("Registrar");
		} else if (path === "/exit") {
			setActivePage("Sair");
		}
	}, [location]);

	// Defining all the navigation pages
	return (
		<nav className="navbar sticky w-full top-0 bg-white h-auto flex items-center justify-between shadow-lg shadow-black/15">
			<div>
				<NavLink to="/" className="text-xl pl-5">
					Mini{" "}
					<span className="uppercase text-slate-950 font-bold">
						Blog
					</span>
				</NavLink>
			</div>
			{user && (
				<div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3 mx-auto">
					<Avatar>
						<AvatarImage src={avatar} alt="Profile avatar" />
					</Avatar>
					<p className="text-lg text-slate-950">{user.displayName}</p>
				</div>
			)}
			<ul className="nav-links flex">
				{!user
					? Object.values(publicPages).map((page: PageType) => (
							<li key={page.id}>
								<NavLink to={page.path}>
									<Button
										className={
											activePage === page.name
												? "text-slate-950 border-slate-950 bg-white rounded-none h-12 text-base"
												: "bg-slate-950 text-white rounded-none h-12 text-base"
										}
									>
										{page.name}
									</Button>
								</NavLink>
							</li>
						))
					: Object.values(loggedPages).map((page: PageType) =>
							page.name === "Sair" ? (
								<li key={page.id}>
									<NavLink to={page.path}>
										<Button
											className={
												"text-white bg-red-700 rounded-none h-12 text-base"
											}
											onClick={logout}
										>
											{page.name}
										</Button>
									</NavLink>
								</li>
							) : (
								<li key={page.id}>
									<NavLink to={page.path}>
										<Button
											className={
												activePage === page.name
													? "text-slate-950 border-slate-950 bg-white rounded-none h-12 text-base "
													: "bg-slate-950 text-white rounded-none h-12 text-base "
											}
										>
											{page.name}
										</Button>
									</NavLink>
								</li>
							),
						)}
			</ul>
		</nav>
	);
};
