// Importing firebase functions, config and type
import { firebaseConfig } from "@/firebase/config";
import { initializeApp } from "firebase/app";
import { doc, deleteDoc, getFirestore } from "firebase/firestore";

// Importing hooks from React
import { useEffect, useReducer, useState } from "react";

// Defines an 'Action' type with a 'type' property (required) and an optional 'payload' property of type 'string'.
type Action = {
	type: string;
	payload?: string;
};

// Defines a 'State' type with 'loading' (can be a boolean or null) and 'error' (can be a string, null, or undefined).
type State = {
	loading: boolean | null;
	error: string | null | undefined;
};

// Initialize firebase application
const app = initializeApp(firebaseConfig);

// Get database from firestore
const db = getFirestore(app);

// Reducer function handling state transitions for document deletion process.
// - "LOADING": Sets loading to true and clears any error.
// - "DELETED_DOC": Resets loading to false after successful deletion.
// - "ERROR": Sets loading to false and records the error from action payload.
const deleteReducer = (state: State, action: Action): State => {
	const type = action.type;

	switch (type) {
		case "LOADING":
			return { loading: true, error: null };
		case "DELETED_DOC":
			return { loading: false, error: null };
		case "ERROR":
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

// Exporting useDeleteDocument hook
export const useDeleteDocument = (docCollection: string) => {
	const [response, dispatch] = useReducer(deleteReducer, {
		loading: null,
		error: null,
	});

	// Treat memory leak
	const [cancelled, setCancelled] = useState(false);

	// Checks if the action should be dispatched based on a cancellation flag.
	// - If not cancelled, the action is dispatched to the store.
	const checkCancelBeforeDispatch = (action: Action) => {
		if (!cancelled) {
			dispatch(action);
		}
	};

	const deleteDocument = async (id: string) => {
		// Initialize loading state
		checkCancelBeforeDispatch({
			type: "LOADING",
		});

		try {
			// Deletes a document from the Firestore database using its collection and ID.
			await deleteDoc(doc(db, docCollection, id));

			// Calls checkCancelBeforeDispatch to dispatch the "DELETED_DOC" action with a success message payload.
			checkCancelBeforeDispatch({
				type: "DELETED_DOC",
				payload: "Documento deletado com sucesso",
			});
		} catch (error) {
			// Checks if the error is an instance of Error, then dispatches the "ERROR" action with the error message.
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

	return { deleteDocument, response };
};
