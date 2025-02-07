// Importing Zod
import { z } from "zod";

// Creating a schema with some validations
export const registerFormSchema = z
	.object({
		avatar: z.string().url("Copie a URL do avatar que deseja inserir"),
		username: z
			.string()
			.min(3, "Nome do usuário precisa de no mínimo 3 caracteres")
			.max(20, "Nome do usuário precisa de no máximo 20 caracteres")
			.transform((name) => {
				return name
					.trim()
					.split(" ")
					.map((word) => {
						return word[0]
							.toLocaleUpperCase()
							.concat(word.substring(1));
					})
					.join(" ");
			}),
		email: z
			.string()
			.nonempty("O email não pode ser vazio")
			.email("Email inválido"),
		password: z
			.string()
			.nonempty("É necessário digitar uma senha")
			.min(6, "Senha precisa de no mínimo 6 caracteres"),
		confirmPassword: z.string().nonempty("É necessário confirmar a senha"),
	})
	.superRefine(({ password, confirmPassword }, ctx) => {
		if (password !== confirmPassword) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "As senhas não coincidem",
				path: ["confirmPassword"],
			});
		}
	});
