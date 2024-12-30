import { useState, useEffect } from "react";
import { firebaseConfig } from "@/firebase/config";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import type { Post } from "@/types/post";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const useFetchDocument = (docCollection: string, id: string) => {
	const [document, setDocument] = useState<Post>();
	const [error, setError] = useState("");
	const [loading, setLoadign] = useState(false);

	const [cancelled, setCancelled] = useState(false);

	useEffect(() => {
		const loadDocument = async () => {
			if (cancelled) return;

			setLoadign(true);

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
				if (err instanceof Error) {
					setError(err.message);
				}
				setLoadign(false);
			}
		};

		loadDocument();
	}, [docCollection, cancelled, id]);

	useEffect(() => {
		return () => setCancelled(true);
	}, []);

	return { document, loading, error };
};
