import { useState, useEffect } from "react";
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
import type { Query } from "firebase/firestore";
import type { Post } from "@/types/post";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const useFetchDocuments = (
	docCollection: string,
	search?: string | null,
	uid?: string | null,
) => {
	const [documents, setDocuments] = useState<Post[]>([]);
	const [error, setError] = useState("");
	const [loading, setLoadign] = useState(false);

	const [cancelled, setCancelled] = useState(false);

	useEffect(() => {
		const loadData = async () => {
			if (cancelled) return;

			setLoadign(true);

			const collectionRef = collection(db, docCollection);

			try {
				let q: Query;

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

				const querySnapshot = await getDocs(q);
				setDocuments([]);

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

				setLoadign(false);
			} catch (err) {
				if (err instanceof Error) {
					console.log(err.message);
					setError(err.message);
				}
				setLoadign(false);
			}
		};

		loadData();
	}, [docCollection, cancelled, search, uid]);

	useEffect(() => {
		return () => setCancelled(true);
	}, []);

	return { documents, loading, error };
};
