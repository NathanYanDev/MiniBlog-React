// Importing firebase functions, config and type
import { firebaseConfig } from "@/firebase/config";
import { initializeApp } from "firebase/app";
import { doc, deleteDoc, getFirestore } from "firebase/firestore";

// Importing hooks from React
import { useEffect, useReducer, useState } from "react";

// Defines an 'Action' type with a 'type' property (required) and an optional 'payload' property of type 'Payload'.
type Action = {
	type: string;
	payload?: string;
};

// Defines a 'State' type with 'loading' (can be a boolean or null) and 'error' (can be a Payload, null, or undefined).
type State = {
	loading: boolean | null;
	error: string | null | undefined;
};

// Initialize firebase application
const app = initializeApp(firebaseConfig);

// Get database from firestore
const db = getFirestore(app);

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

export const useDeleteDocument = (docCollection: string) => {
	const [response, dispatch] = useReducer(deleteReducer, {
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

	const deleteDocument = async (id: string) => {
		// Initialize loading state
		checkCancelBeforeDispatch({
			type: "LOADING",
		});

		try {
			await deleteDoc(doc(db, docCollection, id));

			checkCancelBeforeDispatch({
				type: "DELETED_DOC",
				payload: "Documento deletado com sucesso",
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

	return { deleteDocument, response };
};
