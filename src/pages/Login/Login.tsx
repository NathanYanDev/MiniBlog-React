// Importing components
import { SpinIcon } from "@/components/ui/SpinIcon";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Importing hooks
import { useAuthentication } from "@/hooks/useAuthentication";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

// Importing zod types
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "@/schemas/loginFormSchema";

export const Login = () => {
	// State to show the alert box
	const [showAlertBox, setShowAlertBox] = useState(false);

	// Destructuring the login function, error and loading from the useAuthentication hook
	const { login, error, loading } = useAuthentication();

	// Using useForm to create form with loginFormSchema
	const form = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
	});

	// Defining navigate
	const navigate = useNavigate();

	// Function to submit login form
	const handleSubmitLogin = async (data: z.infer<typeof loginFormSchema>) => {
		await login(data).finally(() => setShowAlertBox(true));

		navigate("/");

		// Hides the alert after 10 seconds
		setTimeout(() => {
			setShowAlertBox(false);
		}, 10000);
	};

	return (
		<div className="flex flex-col py-10 items-center max-w-2xl mx-auto">
			<div className="mb-5">
				<h1 className="text-4xl font-bold mb-1 text-center">Entrar</h1>
				<p className="text-lg text-gray-500 text-center">
					Faça o login para interagir e criar postagens
				</p>
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmitLogin)}
					className="w-full flex flex-col"
				>
					<FormField
						name="email"
						render={({ field }) => (
							<FormItem className="mb-4">
								<FormLabel className="text-base">
									Email:
								</FormLabel>
								<FormControl>
									<Input
										placeholder="Digite o seu email"
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						name="password"
						render={({ field }) => (
							<FormItem className="mb-4">
								<FormLabel className="text-base">
									Senha:
								</FormLabel>
								<FormControl>
									<Input
										placeholder="Digite a sua senha"
										type="password"
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					{loading ? (
						<Button type="submit" disabled className="bg-slate-700">
							<SpinIcon className="animate-spin" />
							<span className="text-white">Processando</span>
						</Button>
					) : (
						<Button
							type="submit"
							className="mx-auto w-48 h-12 text-base bg-emerald-600 text-white hover:bg-white hover:text-emerald-600 "
						>
							{" "}
							Login
						</Button>
					)}
				</form>
			</Form>
			{showAlertBox && error?.code !== null && (
				<Alert className="mt-3" variant={"destructive"}>
					<AlertTitle>{error.title}</AlertTitle>
					<AlertDescription>{error.description}</AlertDescription>
				</Alert>
			)}
		</div>
	);
};
