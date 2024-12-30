import { useQuery } from "@/hooks/useQuery";
import { useFetchDocuments } from "@/hooks/useFetchDocuments";
import { PostDetails } from "@/components/PostDetails";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export const Search = () => {
	const query = useQuery();
	const search = query.get("q");
	const { documents: posts } = useFetchDocuments("posts", search || "");

	return (
		<div className="flex flex-col py-10 max-w-screen-lg mx-auto">
			<div className="flex flex-col items-center">
				<h1 className="text-4xl font-bold text-center mb-5">
					Resultados da pesquisa:
				</h1>
				{posts?.length === 0 && (
					<div className="mb-5 flex flex-col items-center justify-center gap-4">
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
