import type { Timestamp } from "firebase/firestore";

export type Post = {
	id: string;
	uid: string;
	title: string;
	imageURL: string;
	content: string;
	tags: string[];
	createdAt: string;
	createdBy: string;
};
