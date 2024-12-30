import type { Post } from "@/types/post";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router";
import { LimitedParagraph } from "./LimitedParagraph";

type PostDetailsProps = {
	post: Post;
};

export const PostDetails = ({ post }: PostDetailsProps) => {
	return (
		<div className="mb-5">
			<Card className="border-none shadow-none ">
				<CardHeader>
					<CardTitle className="text-3xl font-bold">
						{post.title}
					</CardTitle>
					<CardDescription className="text-gray-500">
						{post.createdBy}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<img
						src={post.imageURL}
						alt="Post"
						className="mb-3 w-full h-auto"
					/>
					<LimitedParagraph text={post.content} limit={150} />
				</CardContent>
				<CardFooter>
					<div className="w-full">
						{post.tags.map((tag) => (
							<span key={tag} className="mr-2">
								#{tag}
							</span>
						))}
					</div>
					<Link to={`/posts/${post.id}`}>
						<Button className="w-32 bg-white text-slate-950 text-md border-2 border-slate-950 hover:text-white hover:bg-slate-950 shadow-none">
							Ler mais
						</Button>
					</Link>
				</CardFooter>
			</Card>
		</div>
	);
};
