// Importing React hooks
import { useState, useEffect } from "react";

// Importing firebase modules and configuration
import { firebaseConfig } from "@/firebase/config";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// Importing Post type
import type { Post } from "@/types/post";

// Initializing firebase app and firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Exporting useFetchDocument hook
export const useFetchDocument = (docCollection: string, id: string) => {
	// State variables
	const [document, setDocument] = useState<Post>();
	const [error, setError] = useState("");
	const [loading, setLoadign] = useState(false);
	const [cancelled, setCancelled] = useState(false);

	useEffect(() => {
		const loadDocument = async () => {
			if (cancelled) return;

			// Sets loading to true before fetching
			setLoadign(true);

			// Tries to fetch a document from Firestore using its ID, and updates state with the document's data.
			// Sets loading to false once the document is successfully retrieved.
			try {
				const docRef = doc(db, docCollection, id);
				const docSnap = await getDoc(docRef);
				const data = docSnap.data();

				setDocument({
					id: docSnap.id,
					uid: data?.uid,
					title: data?.title,
					imageURL: data?.imageURL,
					content: data?.content,
					createdAt: data?.createdAt,
					tags: data?.tags,
					createdBy: data?.createdBy,
				});

				setLoadign(false);
			} catch (err) {
				// Catches errors during document fetch, sets the error message if the error is an instance of Error, and stops loading.
				if (err instanceof Error) {
					setError(err.message);
				}
				setLoadign(false);
			}
		};

		loadDocument();
	}, [docCollection, cancelled, id]);

	// Sets the 'cancelled' state to true when the component is unmounted or the effect is cleaned up.
	useEffect(() => {
		return () => setCancelled(true);
	}, []);

	return { document, loading, error };
};
