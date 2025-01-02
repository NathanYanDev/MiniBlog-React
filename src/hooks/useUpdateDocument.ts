// Importing firebase functions, config and type
import { firebaseConfig } from "@/firebase/config";
import type { UpdatePost } from "@/types/updatePost";
import { initializeApp } from "firebase/app";
import { doc, getFirestore, updateDoc } from "firebase/firestore";

// Importing hooks from React
import { useEffect, useReducer, useState } from "react";

// Defines a 'Payload' type that can be a string
type Payload = string;

// Defines an 'Action' type with a 'type' property (required) and an optional 'payload' property of type 'Payload'.
type Action = {
	type: string;
	payload?: Payload;
};

// Defines a 'State' type with 'loading' (can be a boolean or null) and 'error' (can be a Payload, null, or undefined).
type State = {
	loading: boolean | null;
	error: Payload | null | undefined;
};

// Initialize firebase application
const app = initializeApp(firebaseConfig);

// Get database from firestore
const db = getFirestore(app);

// A reducer function that updates the 'state' based on the 'action' type:
// - 'LOADING' sets loading to true and error to null.
// - 'INSERTED_DOC' sets loading to false and error to null.
// - 'ERROR' sets loading to false and updates the error with the provided payload.
const updateReducer = (state: State, action: Action): State => {
	const type = action.type;

	switch (type) {
		case "LOADING":
			return { loading: true, error: null };
		case "UPDATE_DOC":
			return { loading: false, error: null };
		case "ERROR":
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

// Function to insert document on database
export const useUpdateDocument = (docCollection: string) => {
	// Initializes the 'response' state and 'dispatch' function using the 'useReducer' hook with the 'insertReducer' and an initial state.
	const [response, dispatch] = useReducer(updateReducer, {
		loading: null,
		error: null,
	});

	// Treat memory leak
	const [cancelled, setCancelled] = useState(false);

	const checkCancelBeforeDispatch = (action: Action) => {
		if (!cancelled) {
			dispatch(action);
		}
	};

	const updateDocument = async (id: string, data: UpdatePost) => {
		// Initialize loading state
		checkCancelBeforeDispatch({
			type: "LOADING",
		});

		try {
			const docRef = doc(db, docCollection, id);
			await updateDoc(docRef, data);

			checkCancelBeforeDispatch({
				type: "UPDATE_DOC",
				payload: "Documento atualizado com sucesso",
			});
		} catch (error) {
			if (error instanceof Error) {
				checkCancelBeforeDispatch({
					type: "ERROR",
					payload: error.message,
				});
			}
		}
	};

	// Sets the 'cancelled' state to true when the component is unmounted or the effect is cleaned up.
	useEffect(() => {
		return () => setCancelled(true);
	}, []);

	return { updateDocument, response };
};
