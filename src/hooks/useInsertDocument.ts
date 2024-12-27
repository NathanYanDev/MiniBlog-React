// Importing firebase functions, config and type
import { firebaseConfig } from "@/firebase/config";
import { initializeApp } from "firebase/app";
import type { DocumentData, DocumentReference } from "firebase/firestore";
import {
	Timestamp,
	addDoc,
	collection,
	getFirestore,
} from "firebase/firestore";

// Importing hooks from React
import { useEffect, useReducer, useState } from "react";

// Importing Type from zod and custom schema
import type { z } from "zod";
import type { postFormSchema } from "@/schemas/postFormSchema";

// Defines a 'Payload' type that can either be a string or a Firestore DocumentReference
type Payload = string | DocumentReference<DocumentData>;

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
const insertReducer = (state: State, action: Action): State => {
	const type = action.type;

	switch (type) {
		case "LOADING":
			return { loading: true, error: null };
		case "INSERTED_DOC":
			return { loading: false, error: null };
		case "ERROR":
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

// Function to insert document on database
export const useInsertDocument = (docCollection: string) => {
	// Initializes the 'response' state and 'dispatch' function using the 'useReducer' hook with the 'insertReducer' and an initial state.
	const [response, dispatch] = useReducer(insertReducer, {
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

	const insertDocument = async (document: z.infer<typeof postFormSchema>) => {
		// Initialize loading state
		checkCancelBeforeDispatch({
			type: "LOADING",
		});

		// Tries to insert a new document into Firestore with a timestamp, and dispatches an action on success or error.
		// If insertion succeeds, it dispatches the 'INSERTED_DOC' action with the inserted document.
		// If an error occurs, it dispatches the 'ERROR' action with the error message.
		try {
			const newDocument = { ...document, createdAt: Timestamp.now() };

			const insertedDocument = await addDoc(
				collection(db, docCollection),
				newDocument,
			);

			checkCancelBeforeDispatch({
				type: "INSERTED_DOC",
				payload: insertedDocument,
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

	return { insertDocument, response };
};
