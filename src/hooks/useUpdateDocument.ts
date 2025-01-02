// Importing firebase functions, config and type
import { firebaseConfig } from "@/firebase/config";
import { initializeApp } from "firebase/app";
import { doc, getFirestore, updateDoc } from "firebase/firestore";

// Importing types
import type { UpdatePost } from "@/types/updatePost";

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

// Reducer function managing state transitions for document update process.
// - "LOADING": Sets loading to true and clears any error.
// - "UPDATE_DOC": Resets loading to false after a successful document update.
// - "ERROR": Sets loading to false and stores the error from the action payload.
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

// Exporting useUpdateDocument hook
export const useUpdateDocument = (docCollection: string) => {
	// Initializes the 'response' state and 'dispatch' function using the 'useReducer' hook with the 'updateReducer' and an initial state.
	const [response, dispatch] = useReducer(updateReducer, {
		loading: null,
		error: null,
	});

	// Treat memory leak
	const [cancelled, setCancelled] = useState(false);

	// Dispatches the action only if the 'cancelled' flag is false, preventing unnecessary dispatches.
	const checkCancelBeforeDispatch = (action: Action) => {
		if (!cancelled) {
			dispatch(action);
		}
	};

	// Function to update a document in Firestore
	const updateDocument = async (id: string, data: UpdatePost) => {
		// Initialize loading state
		checkCancelBeforeDispatch({
			type: "LOADING",
		});

		try {
			// Updates a document in Firestore with new data, then dispatches the "UPDATE_DOC" action with a success message, if not cancelled.
			const docRef = doc(db, docCollection, id);
			await updateDoc(docRef, data);

			checkCancelBeforeDispatch({
				type: "UPDATE_DOC",
				payload: "Documento atualizado com sucesso",
			});
		} catch (error) {
			// If the error is an instance of Error, dispatches the "ERROR" action with the error message, if not cancelled.
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
