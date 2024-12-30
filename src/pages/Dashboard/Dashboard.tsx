import { Link } from "react-router";
import { useAuthValue } from "@/context/AuthContext";
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

export const Dashboard = () => {
	const { user } = useAuthValue();
	const uid = user?.uid;
	const { documents: posts } = useFetchDocuments("posts", null, uid);

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
									<Button className="w-24 bg-emerald-700 hover:bg-white hover:text-emerald-700">
										Editar
									</Button>
									<Button
										className="w-24 hover:text-destructive hover:bg-white"
										variant={"destructive"}
									>
										Excluir
									</Button>
								</div>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
		</div>
	);
};
