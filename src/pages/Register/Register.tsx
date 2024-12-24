// Importing hooks
import { useAuthentication } from "@/hooks/useAuthentication";
import { useForm } from "react-hook-form";
import { useState } from "react";

// Importing Types and Schemas
import { registerFormSchema } from "@/schemas/registerFormSchema";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Components
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SpinIcon } from "@/components/ui/SpinIcon";

export const Register = () => {
	// Get createUser, error and loading from useAuthentication
	const { createUser, error, loading } = useAuthentication();

	// Creating a function to handle with AlertBox
	const [showAlertBox, setShowAlertBox] = useState(false);

	// Initializes the form with validation using Zod, inferring the type based on the RegisterForm schema
	const form = useForm<z.infer<typeof registerFormSchema>>({
		resolver: zodResolver(registerFormSchema), // Conecting Zod schema with React Hook Form
	});

	// Asynchronous function to register a user, calling the 'createUser' API with form data
	const handleSubmitRegister = async (
		data: z.infer<typeof registerFormSchema>,
	) => {
		const res = await createUser(data)
			.then((userDetails) => {
				setShowAlertBox(true); // Shows alert on success
				return userDetails;
			})
			.catch(() => {
				setShowAlertBox(true); // Shows alert on error
			});

		// Hides the alert after 10 seconds
		setTimeout(() => {
			setShowAlertBox(false);
		}, 10000);

		console.log(res);
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
					onSubmit={form.handleSubmit(handleSubmitRegister)}
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
					{loading ? (
						<Button type="submit" disabled className="bg-slate-700">
							<SpinIcon className="animate-spin" />
							<span className="text-white">Processando</span>
						</Button>
					) : (
						<Button type="submit">Registrar</Button>
					)}
				</form>
			</Form>

			{/* Verifying if alert box will show an error or a success message */}
			{showAlertBox && error?.code !== null && (
				<Alert className={"mt-3"} variant={"destructive"}>
					<AlertTitle>{error.title}</AlertTitle>
					<AlertDescription>{error.description}</AlertDescription>
				</Alert>
			)}
			{showAlertBox && error?.code === null && (
				<Alert className="mt-3 bg-emerald-600 text-white">
					<AlertTitle className="font-bold">
						Cadastro realizado com sucesso
					</AlertTitle>
					<AlertDescription>
						Redirecionando a tela de login
					</AlertDescription>
				</Alert>
			)}
		</div>
	);
};
