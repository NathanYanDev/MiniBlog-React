// Importing Zod
import { z } from "zod";

// Creating a schema with some validations
export const loginFormSchema = z.object({
	email: z
		.string()
		.nonempty("O email não pode ser vazio")
		.email("Email inválido"),
	password: z
		.string()
		.nonempty("É necessário digitar uma senha")
		.min(6, "Senha precisa de no mínimo 6 caracteres"),
});
