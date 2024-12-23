import { registerFormSchema } from "@/schemas/registerFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

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

import { useAuthentication } from "@/hooks/useAuthentication";
import { SpinIcon } from "@/components/ui/SpinIcon";

export const Register = () => {
	const { createUser, error, loading } = useAuthentication();

	const form = useForm<z.infer<typeof registerFormSchema>>({
		resolver: zodResolver(registerFormSchema),
	});

	const handleSubmitRegister = async (
		data: z.infer<typeof registerFormSchema>,
	) => {
		const res = await createUser(data);

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
		</div>
	);
};
