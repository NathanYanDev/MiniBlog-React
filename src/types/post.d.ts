// Type definition for a Post, including fields like id, user ID, title, content, tags, creation date, and creator's name.
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
