import type { NavigationPagesType } from "@/types/navigationPages";

const loggedPages: NavigationPagesType = {
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
		path: "/posts/create",
	},
	dashboard: {
		id: 4,
		name: "Dashboard",
		path: "/dashboard",
	},
	exit: {
		id: 7,
		name: "Sair",
		path: "/",
	},
};

const publicPages: NavigationPagesType = {
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
	login: {
		id: 5,
		name: "Login",
		path: "/login",
	},
	register: {
		id: 6,
		name: "Registrar",
		path: "/register",
	},
};

export { loggedPages, publicPages };
