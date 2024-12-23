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
			<div>
				<NavLink to="/" className={"text-xl"}>
					Mini{" "}
					<span className="uppercase text-slate-950 font-bold">
						Blog
					</span>
				</NavLink>
			</div>
			<ul className="nav-links flex">
				{Object.values(navigationPages).map(
					(page: PageType) =>
						loggedIn &&
						page.name !== "Login" && (
							<li key={page.id}>
								<NavLink to={page.path}>
									<Button
										className={
											activePage === page.name
												? "text-slate-950 border-slate-950 bg-white rounded-none "
												: "bg-slate-950 text-white rounded-none "
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
