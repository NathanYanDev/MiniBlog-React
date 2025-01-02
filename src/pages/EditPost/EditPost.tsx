// Importing components
import { SpinIcon } from "@/components/ui/SpinIcon";
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
import { Textarea } from "@/components/ui/textarea";

// Importing Hooks and Context
import { useAuthValue } from "@/context/AuthContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";

// Importing types and Schemas
import type { z } from "zod";
import { postFormSchema } from "@/schemas/postFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFetchDocument } from "@/hooks/useFetchDocument";
import { useUpdateDocument } from "@/hooks/useUpdateDocument";

export const EditPost = () => {
	const { id } = useParams();
	const { document: post } = useFetchDocument("posts", id || "");

	// Get user from AuthContext
	const { user } = useAuthValue();

	const [charCount, setCharCount] = useState(0);

	// Get insertDocument function and response state from custom hook
	const { updateDocument, response } = useUpdateDocument("posts");

	// Creating a state to handle with AlertBox
	const [showAlertBox, setShowAlertBox] = useState(false);

	// Initializes the form with Zod validation using React Hook Form and the defined postFormSchema.
	const form = useForm<z.infer<typeof postFormSchema>>({
		resolver: zodResolver(postFormSchema),
	});

	// Initializes the 'navigate' function from 'react-router' for programmatic navigation.
	const navigate = useNavigate();

	// Handles form submission: adds user info to post data, inserts the document, and navigates to the home page.
	const editPostSubmit = (data: z.infer<typeof postFormSchema>) => {
		if (user) {
			const updateData = {
				...data,
				uid: user.uid,
				createdBy: user.displayName || "Unknown",
			};
			updateDocument(id || "", updateData);
			navigate("/dashboard");
		}

		// Hides the alert after 10 seconds
		setTimeout(() => {
			setShowAlertBox(false);
		}, 10000);
	};

	return (
		<div className="grid grid-cols-2 gap-4 px-5 py-10">
			<div className="flex flex-col items-center justify-center max-w-3xl mx-auto">
				<h1 className="text-4xl font-bold mb-3">
					Antigo post:{" "}
					<span className="text-emerald-600">{post?.title}</span>
				</h1>
				<img src={post?.imageURL} alt={post?.title} className="mb-3" />
				<p>{post?.content}</p>
				<p className="mt-3">
					<span className="font-bold text-lg">Tags: </span>
					{post?.tags.map((tag) => (
						<span key={tag} className="mr-3">
							#{tag}
						</span>
					))}
				</p>
			</div>
			<div className="flex flex-col items-center max-w-4xl w-full mx-auto">
				<div className="flex flex-col items-center">
					<h1 className="text-4xl font-bold mb-3">
						Editando post:{" "}
						<span className="text-emerald-600">{post?.title}</span>
					</h1>
					<p className="text-gray-500 text-lg mb-3">
						Altere os dados do post como desejar
					</p>
				</div>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(editPostSubmit)}
						className="w-full flex flex-col gap-2"
					>
						<FormField
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-base">
										Título:
									</FormLabel>
									<FormControl>
										<Input
											placeholder="Pense num bom título"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="imageURL"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-base">
										URL da imagem:
									</FormLabel>
									<FormControl>
										<Input
											placeholder="Insira a URL da imagem que representa seu post"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="content"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-base">
										Conteúdo:
									</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder="Insira o conteúdo do post"
											value={field.value}
											onChange={(e) => {
												setCharCount(
													e.target.value.length,
												);
												field.onChange(e);
											}}
											className="resize-none h-48"
										/>
									</FormControl>
									<FormDescription>
										{charCount} / 2000
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="tags"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-base">
										Tags:{" "}
										<span className="text-xs text-gray-600">
											{"("}Separados por vírgula{")"}
										</span>
									</FormLabel>
									<FormControl>
										<Input
											placeholder="Insira as tags separadas por vírgula"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{response.loading ? (
							<Button
								type="submit"
								disabled
								className="bg-slate-700"
							>
								<SpinIcon className="animate-spin" />
								<span className="text-white text-lg">
									Processando
								</span>
							</Button>
						) : (
							<Button
								type="submit"
								className="bg-emerald-600 text-white text-lg hover:bg-white hover:text-emerald-600"
							>
								Editar
							</Button>
						)}
					</form>
				</Form>
				{showAlertBox && response.error && (
					<Alert className="mt-3" variant={"destructive"}>
						<AlertTitle>Erro</AlertTitle>
						<AlertDescription>
							{response.error?.toString()}
						</AlertDescription>
					</Alert>
				)}
			</div>
		</div>
	);
};
