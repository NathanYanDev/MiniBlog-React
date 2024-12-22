// Importing shadcn component
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

// Importing React Router NavLink
import { NavLink, useLocation } from "react-router";

// Importing navigationPages from constants and PageType from types
import { navigationPages } from "@/constants/navigationPages";
import type { NamePagesType, PageType } from "@/types/navigationPages";

export const Navbar = () => {
	const [loggedIn] = useState(true);
	const [activePage, setActivePage] = useState<NamePagesType>("Home");
	const location = useLocation();

	useEffect(() => {
		const path = location.pathname;
		if (path === "/") {
			setActivePage("Home");
		} else if (path === "/about") {
			setActivePage("About");
		} else if (path === "/new-post") {
			setActivePage("Novo Post");
		} else if (path === "/dashboard") {
			setActivePage("Dashboard");
		} else if (path === "/login") {
			setActivePage("Login");
		} else if (path === "/exit") {
			setActivePage("Sair");
		}
	}, [location]);

	// Defining all the navigation pages
	return (
		<nav className="navbar h-auto p-5 flex align-center justify-between shadow-lg shadow-black/15">
			<div className="logo">
				<NavLink to="/">
					Mini <span className="uppercase">Blog</span>
				</NavLink>
			</div>
			<ul className="nav-links flex">
				{Object.values(navigationPages).map(
					(page: PageType) =>
						loggedIn &&
						page.name !== "Login" && (
							<li key={page.id} className="mr-2">
								<NavLink to={page.path}>
									<Button
										className={
											activePage === page.name
												? "text-slate-900 border-slate-900 bg-white"
												: "bg-slate-900 text-white"
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
