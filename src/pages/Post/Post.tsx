import { useFetchDocument } from "@/hooks/useFetchDocument";
import { useParams } from "react-router";

export const Post = () => {
	const { id } = useParams();
	const { document: post } = useFetchDocument("posts", id || "");

	return (
		<div className="flex flex-col py-10 max-w-screen-lg mx-auto">
			{post && (
				<div>
					<div className="mb-3">
						<h1 className="text-4xl font-bold">{post.title}</h1>
						<span className="text-gray-500 text-lg">
							{post.createdBy}
						</span>
					</div>
					<img src={post.imageURL} alt={post.title} />
					<p className="text-lg py-2 mb-3">{post.content}</p>
					<div className="my-3 flex flex-col items-center justify-center">
						<h2 className="text-3xl font-bold">
							Este post trata sobre:{" "}
						</h2>
						<div className="flex">
							{post.tags.map((tag) => (
								<span
									key={tag}
									className="mr-2 text-lg text-gray-800"
								>
									<span className="font-bold text-black">
										#
									</span>
									{tag}
								</span>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
