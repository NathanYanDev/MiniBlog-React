import type { z } from "zod";
import { registerFormSchema } from "@/schemas/registerFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
	Form,
	FormLabel,
	FormDescription,
	FormField,
	FormItem,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Register = () => {
	const form = useForm<z.infer<typeof registerFormSchema>>({
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const createUser = (data: z.infer<typeof registerFormSchema>) => {
		console.log(data);
	};

	return (
		<div className="flex flex-col p-5 items-center max-w-2xl mx-auto">
			<div className="mb-5">
				<h1 className="text-4xl font-bold mb-1">
					Cadastre-se para postar
				</h1>
				<p className="text-lg">
					Crie seu usuário e compartilhe suas histórias
				</p>
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(createUser)}
					className="w-full flex flex-col gap-2"
				>
					<FormField
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nome do usuário:</FormLabel>
								<FormControl>
									<Input
										placeholder="Digite o nome do usuário"
										{...field}
										type="text"
									/>
								</FormControl>
								<FormDescription>
									Esse será o nome que outros usuários verão.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email:</FormLabel>
								<FormControl>
									<Input
										placeholder="Digite o seu email"
										{...field}
										type="email"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Senha:</FormLabel>
								<FormControl>
									<Input
										placeholder="Digite a sua senha"
										{...field}
										type="password"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirme sua senha:</FormLabel>
								<FormControl>
									<Input
										placeholder="Confirme a sua senha"
										{...field}
										type="password"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Registrar</Button>
				</form>
			</Form>
		</div>
	);
};
