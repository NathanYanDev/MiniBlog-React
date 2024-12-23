import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/firebase/config";

import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

import type { registerFormSchema } from "@/schemas/registerFormSchema";
import type { z } from "zod";

export const useAuthentication = () => {
	const app = initializeApp(firebaseConfig);

	console.log(app);

	const [error, setError] = useState<Error | string>("");
	const [loading, setLoading] = useState<boolean | null>(null);

	const [cancelled, setCancelled] = useState<boolean>(false);

	const auth = getAuth(app);

	const checkIfCancelled = () => {
		if (cancelled) {
			return;
		}
	};

	const createUser = async (data: z.infer<typeof registerFormSchema>) => {
		checkIfCancelled();

		setLoading(true);

		try {
			const { user } = await createUserWithEmailAndPassword(
				auth,
				data.email,
				data.password,
			);

			await updateProfile(user, {
				displayName: data.username,
			});

			setLoading(false);

			return user;
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
				setLoading(false);
				console.log(error);
			}
		}
	};

	// TODO: VERIFICAR EMAILS JÁ CADASTRADOS, COLOCAR UM ALERTA COM SHADCN

	useEffect(() => {
		return () => setCancelled(true);
	}, []);

	return {
		auth,
		createUser,
		error,
		loading,
	};
};
