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
	exit: {
		id: 6,
		name: "Sair",
		path: "/exit",
	},
};
