export const Loading = () => {
	return (
		<div className="flex items-center justify-center h-screen bg-gray-100">
			<div className="flex items-center space-x-2">
				<div className="w-14 h-14 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin" />
				<span className="text-2xl text-gray-700">Carregando...</span>
			</div>
		</div>
	);
};
