// Importing components
import { PostDetails } from "@/components/PostDetails";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loading } from "@/components/Loading";

// Importing hooks
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useFetchDocuments } from "@/hooks/useFetchDocuments";
import { Link, useNavigate } from "react-router";

// Importing zod and zodResolver
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Creating schema for tagsForm
const tagsFormSchema = z.object({
	tags: z.string(),
});

export const Home = () => {
	// Using useState to store the query
	const [query, SetQuery] = useState("");

	// Using useFetchDocuments to fetch posts
	const { documents: posts, loading } = useFetchDocuments("posts");

	// Defining navigate
	const navigate = useNavigate();

	// Using useForm to create form with tagsFormSchema
	const form = useForm<z.infer<typeof tagsFormSchema>>({
		resolver: zodResolver(tagsFormSchema),
	});

	// Function to submit tagsForm
	const searchTagsSubmit = () => {
		// If query is not empty, navigate to /search?q=query
		if (query) {
			return navigate(`/search?q=${query}`);
		}
	};

	// If loading is true, return Loading component
	if (loading) {
		return <Loading />;
	}

	return (
		<div className="flex flex-col py-10 max-w-screen-lg mx-auto">
			<h1 className="text-4xl font-bold text-center mb-5">
				Veja os nossos posts mais recentes
			</h1>

			<Form {...form}>
				<form
					className="grid grid-cols-5 gap-3 mb-5 py-3"
					onSubmit={form.handleSubmit(searchTagsSubmit)}
				>
					<FormField
						name="tags"
						render={({ field }) => (
							<FormItem className="col-span-4">
								<FormControl>
									<Input
										{...field}
										placeholder="Ou busque por tags..."
										value={field.value}
										onChange={(e) => {
											SetQuery(e.target.value);
											field.onChange(e);
										}}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<Button type="submit" className="col-span-1">
						Pesquisar
					</Button>
				</form>
			</Form>

			<div className="flex flex-col items-center">
				<h1 className="text-4xl font-bold text-center mb-5">
					Posts...
				</h1>
				{posts?.length === 0 && (
					<div className="mb-5">
						<p>Não foram encontrados posts</p>
						<Link to="/posts/create">
							<Button className="w-32">Criar post</Button>
						</Link>
					</div>
				)}
				<ul className="mb-5">
					{posts?.map((post) => (
						<li key={post.id}>
							<PostDetails post={post} />
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
