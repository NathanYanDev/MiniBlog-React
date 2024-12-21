// Importing shadcn component
import { Button } from "@/components/ui/button";

// Importing React Router NavLink
import { NavLink } from "react-router";

// Type definition for the page
type PageType = {
	id: number;
	name: string;
	path: string;
};

// Type definition for the navigation pages
interface NavigationPagesType {
	home: PageType;
	about: PageType;
	newPost: PageType;
	dashboard: PageType;
	login: PageType;
	exit: PageType;
}

export const Navbar = () => {
	// Defining all the navigation pages
	const navigationPages: NavigationPagesType = {
		home: {
			id: 1,
			name: "Home",
			path: "/",
		},
		about: {
			id: 2,
			name: "About",
			path: "/about",
		},
		newPost: {
			id: 3,
			name: "Novo Post",
			path: "/new-post",
		},
		dashboard: {
			id: 4,
			name: "Dashboard",
			path: "/dashboard",
		},
		login: {
			id: 5,
			name: "Login",
			path: "/login",
		},
		exit: {
			id: 6,
			name: "Sair",
			path: "/exit",
		},
	};

	return (
		<nav className="navbar flex align-center justify-between h-7 p-5">
			<div className="logo">
				<NavLink to="/">
					Mini <span>Blog</span>
				</NavLink>
			</div>
			<ul className="nav-links flex">
				{Object.values(navigationPages).map((page: PageType) => (
					<li key={page.id} className="mr-3">
						<NavLink to={page.path}>
							<Button>{page.name}</Button>
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	);
};
