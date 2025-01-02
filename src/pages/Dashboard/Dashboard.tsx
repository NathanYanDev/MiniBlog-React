// Importing hooks and context
import { Link, useNavigate } from "react-router";
import { useAuthValue } from "@/context/AuthContext";
import { useDeleteDocument } from "@/hooks/useDeleteDocument";
import { useState } from "react";

// Importing components
import { Button } from "@/components/ui/button";
import { useFetchDocuments } from "@/hooks/useFetchDocuments";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loading } from "@/components/Loading";

export const Dashboard = () => {
	// Fetching posts and user
	const { user } = useAuthValue();
	const uid = user?.uid;

	const { documents: posts, loading } = useFetchDocuments("posts", null, uid);

	// Deleting post
	const { deleteDocument } = useDeleteDocument("posts");

	// Alert box
	const [ShowAlertBox, setShowAlertBox] = useState(false);

	// Navigation
	const navigate = useNavigate();

	// Function to delete post
	const handleDeleteDocument = async (id: string) => {
		await deleteDocument(id);
		setShowAlertBox(true);
	};

	// If loading, show loading component
	if (loading) {
		return <Loading />;
	}

	return (
		<div className="flex flex-col py-10 max-w-screen-lg mx-auto">
			<div className="mb-3">
				<h1 className="text-4xl font-bold text-center">Dashboard</h1>
				<p className="text-lg text-gray-500 text-center">
					Gerencie seus posts
				</p>
			</div>
			{posts && posts.length === 0 ? (
				<div>
					<p>Não foram encontrados posts</p>
					<Link to={"/posts/create"}>
						<Button>Criar primeiro post</Button>
					</Link>
				</div>
			) : (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className=" text-slate-950 text-2xl text-left">
								Título
							</TableHead>
							<TableHead className="text-slate-950 text-2xl text-right">
								Ações
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{posts.map((post) => (
							<TableRow key={post.id} className="mt-3">
								<TableCell className="text-lg">
									{post.title}
								</TableCell>
								<div className="flex justify-end gap-2 h-[45px] items-center">
									<Link to={`/posts/${post.id}`}>
										<Button className="w-24 hover:text-[#0f172a] hover:bg-white">
											Ver
										</Button>
									</Link>
									<Button
										className="w-24 bg-emerald-700 hover:bg-white hover:text-emerald-700"
										onClick={() =>
											navigate(`/posts/edit/${post.id}`)
										}
									>
										Editar
									</Button>
									<Button
										className="w-24 hover:text-destructive hover:bg-white"
										variant={"destructive"}
										onClick={() =>
											handleDeleteDocument(post.id)
										}
									>
										Excluir
									</Button>
								</div>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
			{ShowAlertBox && (
				<Alert variant={"destructive"}>
					<AlertTitle>Post excluído com sucesso</AlertTitle>
					<AlertDescription>
						Recarregue a página para ver as alterações
					</AlertDescription>
				</Alert>
			)}
		</div>
	);
};
