// Importing hooks
import { useAuthentication } from "@/hooks/useAuthentication";
import { useState } from "react";
import { useForm } from "react-hook-form";

// Importing Types and Schemas
import { registerFormSchema } from "@/schemas/registerFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

import { SpinIcon } from "@/components/ui/SpinIcon";
// Components
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Skeleton } from "@/components/ui/skeleton";

export const Register = () => {
	const [avatar, setAvatar] = useState("");
	// Get createUser, error and loading from useAuthentication
	const { createUser, error, loading } = useAuthentication();

	// Creating a state to handle with AlertBox
	const [showAlertBox, setShowAlertBox] = useState(false);

	// Initializes the form with validation using Zod, inferring the type based on the RegisterForm schema
	const form = useForm<z.infer<typeof registerFormSchema>>({
		resolver: zodResolver(registerFormSchema), // Conecting Zod schema with React Hook Form
	});

	// Asynchronous function to register a user, calling the 'createUser' API with form data
	const handleSubmitRegister = async (
		data: z.infer<typeof registerFormSchema>,
	) => {
		await createUser(data).finally(() => setShowAlertBox(true));

		// Hides the alert after 10 seconds
		setTimeout(() => {
			setShowAlertBox(false);
		}, 10000);
	};

	return (
		<main className="flex flex-col py-10 items-center max-w-2xl mx-auto">
			<div className="mb-5">
				<h1 className="text-4xl font-bold mb-1">
					Cadastre-se para postar
				</h1>
				<p className="text-lg text-gray-500 text-center">
					Crie seu usuário e compartilhe suas histórias
				</p>
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmitRegister)}
					className="w-full flex flex-col gap-2"
				>
					<FormField
						name="avatar"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-base">
									Avatar:
								</FormLabel>
								<div className="flex items-center gap-6">
									<FormControl>
										<Input
											{...field}
											placeholder="Insira a URL do avatar"
											type="text"
											className="w-4/5"
											value={field.value}
											onChange={(e) => {
												setAvatar(e.target.value);
												field.onChange(e);
											}}
										/>
									</FormControl>
									<FormMessage />
									<Avatar>
										<AvatarImage
											src={avatar}
											alt="avatar"
										/>
										<AvatarFallback>
											<Skeleton />
										</AvatarFallback>
									</Avatar>
								</div>
							</FormItem>
						)}
					/>
					<FormField
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-base">
									Nome do usuário:
								</FormLabel>
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
								<FormLabel className="text-base">
									Email:
								</FormLabel>
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
								<FormLabel className="text-base">
									Senha:
								</FormLabel>
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
								<FormLabel className="text-base">
									Confirme sua senha:
								</FormLabel>
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

			{/* Verifying if alert box will show an error message */}
			{showAlertBox && error?.code !== null && (
				<Alert className={"mt-3"} variant={"destructive"}>
					<AlertTitle>{error.title}</AlertTitle>
					<AlertDescription>{error.description}</AlertDescription>
				</Alert>
			)}
		</main>
	);
};
