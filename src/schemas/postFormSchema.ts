import { z } from "zod";

// Defines a Zod schema for validating the post form fields:
// - 'title' must be a string between 3 and 50 characters.
// - 'imageURL' must be a valid URL.
// - 'content' must be a string with a maximum length of 250 characters.
// - 'tags' is a string, transformed into an array of lowercase, trimmed tags.
export const postFormSchema = z.object({
	title: z
		.string()
		.min(3, "Insira um título com 3 caracteres ou mais")
		.max(50, "Insira um título com menos de 50 caracteres"),
	imageURL: z.string().url("Insira uma URL válida"),
	content: z.string().max(250, "Limite máximo de caracteres atingidos"),
	tags: z.string().transform((tags) => {
		return tags.split(",").map((tag) => tag.trim().toLowerCase());
	}),
});
