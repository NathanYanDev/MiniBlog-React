// Type definition for updating a post, excluding the post ID and creation date, but including user data and content.
export type UpdatePost = {
	uid: string;
	title: string;
	imageURL: string;
	content: string;
	tags: string[];
	createdBy: string;
};
