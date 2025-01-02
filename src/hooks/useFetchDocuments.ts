// Importing React hooks
import { useState, useEffect } from "react";

// Importing Firebase modules and configuration
import { firebaseConfig } from "@/firebase/config";
import { initializeApp } from "firebase/app";
import {
	collection,
	query,
	orderBy,
	getDocs,
	getFirestore,
	where,
} from "firebase/firestore";

// Importing types
import type { Query } from "firebase/firestore";
import type { Post } from "@/types/post";

// Initializing firebase app and firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Exporting useFetchDocuments hook
export const useFetchDocuments = (
	docCollection: string,
	search?: string | null,
	uid?: string | null,
) => {
	// State variables
	const [documents, setDocuments] = useState<Post[]>([]);
	const [error, setError] = useState("");
	const [loading, setLoadign] = useState(false);
	const [cancelled, setCancelled] = useState(false);

	useEffect(() => {
		const loadData = async () => {
			if (cancelled) return;

			// Sets loading to true before fetching
			setLoadign(true);

			// References a Firestore collection using the specified collection name.
			const collectionRef = collection(db, docCollection);

			try {
				let q: Query;

				// Builds a Firestore query based on search or user ID (uid):
				// - If search is provided, filters by tags and orders by creation date.
				// - If uid is provided, filters by user ID and orders by creation date.
				// - Otherwise, orders documents by creation date.
				if (search) {
					q = query(
						collectionRef,
						where("tags", "array-contains", search),
						orderBy("createdAt", "desc"),
					);
				} else if (uid) {
					q = query(
						collectionRef,
						where("uid", "==", uid),
						orderBy("createdAt", "desc"),
					);
				} else {
					q = query(collectionRef, orderBy("createdAt", "desc"));
				}

				// Executes the Firestore query and retrieves the documents matching the query.
				const querySnapshot = await getDocs(q);
				setDocuments([]);

				// Loops through the retrieved Firestore documents, maps them to a new Post object,
				// and appends each new document to the state array using setDocuments.
				for (const doc of querySnapshot.docs) {
					const data = doc.data();
					const newDoc: Post = {
						id: doc.id,
						uid: data.uid,
						title: data.title,
						imageURL: data.imageURL,
						content: data.content,
						createdAt: data.createdAt,
						tags: data.tags,
						createdBy: data.createdBy,
					};

					setDocuments((prevState) => [...prevState, newDoc]);
				}

				// Sets loading to false once the documents are successfully retrieved.
				setLoadign(false);
			} catch (err) {
				// Catches errors during document fetch, sets the error message if the error is an instance of Error, and stops loading.
				if (err instanceof Error) {
					console.log(err.message);
					setError(err.message);
				}
				setLoadign(false);
			}
		};

		loadData();
	}, [docCollection, cancelled, search, uid]);

	// Sets the 'cancelled' state to true when the component is unmounted or the effect is cleaned up.
	useEffect(() => {
		return () => setCancelled(true);
	}, []);

	return { documents, loading, error };
};
