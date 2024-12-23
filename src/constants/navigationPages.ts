import type { NavigationPagesType } from "@/types/navigationPages";

export const navigationPages: NavigationPagesType = {
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
	register: {
		id: 6,
		name: "Registrar",
		path: "/register",
	},
	exit: {
		id: 7,
		name: "Sair",
		path: "/exit",
	},
};
