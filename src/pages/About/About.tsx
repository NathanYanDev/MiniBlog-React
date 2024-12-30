import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export const About = () => {
	return (
		<div className="flex flex-col items-center justify-center max-w-3xl py-10 mx-auto">
			<h1 className="text-4xl font-bold mb-3">Sobre o Mini Blog</h1>
			<p className="text-gray-500 text-lg mb-3">
				Este é um projeto de um{" "}
				<span className="font-bold text-slate-800">Mini Blog</span>{" "}
				desenvolvido com{" "}
				<span className="font-bold text-slate-800">React</span> e{" "}
				<span className="font-bold text-slate-800">Typescript</span> no
				front-end e{" "}
				<span className="font-bold text-slate-800">Firebase</span> no
				back-end. O objetivo do projeto é criar uma aplicação simples de
				blog, onde é possível adicionar, visualizar e interagir com
				postagens.
			</p>
			<div className="w-full">
				<Link to="/posts/create">
					<Button className="h-12 text-xl w-full">Criar post</Button>
				</Link>
			</div>
		</div>
	);
};
