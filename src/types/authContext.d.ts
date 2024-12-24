// Type with details get from firebase returning
type UserDetails = {
	username: string;
	email: string;
	password: string;
	token: string;
};

// Type for AuthContext
type AuthContextType = {
	userInfo: UserDetails;
	login: () => void;
	logout: () => void;
};

export type { UserDetails, AuthContextType };
