import type { User } from "firebase/auth";

// Type for AuthContext
type AuthContextType = {
	user: User | undefined | null;
};

export type { AuthContextType };
