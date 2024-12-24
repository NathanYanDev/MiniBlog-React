// Importing hooks
import { createContext, useContext } from "react";
import type { AuthContextType } from "@/types/authContext";

// Creating Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Creating Auth Provider
const AuthProvider = ({
	children,
	value,
}: { children: React.ReactNode; value: any }) => {
	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};

// Verifying if context exists and return
const useAuthValue = () => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("Usar o contexto dentro do provider");
	}

	return context;
};

export { AuthProvider, useAuthValue };
