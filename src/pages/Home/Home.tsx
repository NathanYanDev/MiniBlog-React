import { PostDetails } from "@/components/PostDetails";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFetchDocuments } from "@/hooks/useFetchDocument";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { Loading } from "@/components/Loading";

const tagsFormSchema = z.object({
	tags: z.string(),
});

export const Home = () => {
	const [query, SetQuery] = useState("");
	const { documents: posts, loading } = useFetchDocuments("posts");
	const navigate = useNavigate();

	const form = useForm<z.infer<typeof tagsFormSchema>>({
		resolver: zodResolver(tagsFormSchema),
	});

	const searchTagsSubmit = (data: z.infer<typeof tagsFormSchema>) => {
		if (query) {
			return navigate(`/search?q=${query}`);
		}
	};

	return (
		<div className="flex flex-col py-10 max-w-screen-lg mx-auto">
			{loading && <Loading />}
			{!loading && (
				<>
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
				</>
			)}
		</div>
	);
};
