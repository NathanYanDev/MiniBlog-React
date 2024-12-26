// Importing React Hooks
import { useEffect, useState } from "react";

// Importing Types from Zod
import type { z } from "zod";

// Importing firebase configuration
import { firebaseConfig } from "@/firebase/config";

// Importing Firebase functions to initialize the app and handle authentication.
import { initializeApp } from "firebase/app";
import {
	createUserWithEmailAndPassword,
	getAuth,
	updateProfile,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";

// Importing Error Type
import type { ErrorType } from "@/types/error";

// importing Register Form Schema created using Zod
import type { registerFormSchema } from "@/schemas/registerFormSchema";
import type { loginFormSchema } from "@/schemas/loginFormSchema";

export const useAuthentication = () => {
	// Creating app with firebase config
	const app = initializeApp(firebaseConfig);

	// Creating a state to handle with errors
	const [error, setError] = useState<ErrorType>({
		code: null,
		title: "",
		description: "",
	});

	const [loading, setLoading] = useState<boolean>(false);

	// State to handle component unmounting
	const [cancelled, setCancelled] = useState<boolean>(false);

	// Initializing Firebase Authentication
	const auth = getAuth(app);

	// Function to treat memory leak
	const checkIfCancelled = () => {
		if (cancelled) {
			return;
		}
	};

	// Reseting error state
	const resetErrorState = () => {
		setError((prevState) => ({
			...prevState,
			code: null,
			title: "",
			description: "",
		}));
	};

	//
	const createUser = async (data: z.infer<typeof registerFormSchema>) => {
		checkIfCancelled();
		resetErrorState();

		// Initializing loading state until request finish
		setLoading(true);

		try {
			// Get user info from firebase function
			const { user } = await createUserWithEmailAndPassword(
				auth,
				data.email,
				data.password,
			);

			// Update display name profile
			await updateProfile(user, {
				displayName: data.username,
			});

			// Ending loading state
			setLoading(false);

			return user;
		} catch (err) {
			if (err instanceof Error) {
				// Treating error where email is already created
				if (err.message.includes("email-already-in-use")) {
					setError((prevState) => ({
						...prevState,
						code: 409,
						title: "O email já foi cadastrado",
						description:
							"Cadastre outro email ou tente realizar o login por esse já cadastrado",
					}));
				} else {
					// Treating other errors
					setError((prevState) => ({
						...prevState,
						code: 400,
						title: "Ocorreu um erro",
						description: "Tente novamente",
					}));
				}

				// Ending loading state
				setLoading(false);
			}
		}
	};

	// User logout
	const logout = () => {
		checkIfCancelled();
		signOut(auth);
	};

	// User login
	const login = async (data: z.infer<typeof loginFormSchema>) => {
		checkIfCancelled();
		resetErrorState();
		setLoading(true);

		try {
			await signInWithEmailAndPassword(auth, data.email, data.password);

			// Ending loading state
			setLoading(false);
		} catch (err) {
			if (err instanceof Error) {
				// Treating error where email is already created
				if (err.message.includes("invalid-credential")) {
					setError((prevState) => ({
						...prevState,
						code: 404,
						title: "Email/senha incorreto",
						description:
							"Verifique se o email ou a senha foi digitado corretamente",
					}));
				} else {
					// Treating other errors
					setError((prevState) => ({
						...prevState,
						code: 500,
						title: "Erro interno",
						description: "Tente novamente mais tarde",
					}));
				}

				// Ending loading state
				setLoading(false);
			}
		}
	};

	useEffect(() => {
		return () => setCancelled(true);
	}, []);

	return {
		auth,
		createUser,
		login,
		logout,
		error,
		loading,
	};
};
