// Type definition for the name of the pages
export type NamePagesType =
	| "Home"
	| "About"
	| "Novo Post"
	| "Dashboard"
	| "Login"
	| "Registrar"
	| "Sair";

// Type definition for the page
export type PageType = {
	id: number;
	name: NamePagesType;
	path: string;
};

// Type definition for the navigation pages
export type NavigationPagesType = {
	home: PageType;
	about: PageType;
	newPost: PageType;
	dashboard: PageType;
	login: PageType;
	register: PageType;
	exit: PageType;
};
