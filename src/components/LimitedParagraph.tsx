type LimitedParagraphProps = {
	text: string;
	limit: number;
};

export const LimitedParagraph = ({ text, limit }: LimitedParagraphProps) => {
	const textLimited =
		text.length > limit ? `${text.slice(0, limit)}...` : text;

	return <p>{textLimited}</p>;
};
