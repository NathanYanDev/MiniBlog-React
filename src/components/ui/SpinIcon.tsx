import type { ComponentProps } from "react";

export function SpinIcon(props: ComponentProps<"svg">) {
	return (
		<svg
			width="800px"
			height="800px"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<title>Spinning Icon</title>
			<g fill="#fff">
				<path
					opacity={0.7}
					fillRule="evenodd"
					clipRule="evenodd"
					d="M12 19a7 7 0 100-14 7 7 0 000 14zm0 3c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
				/>
				<path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 00-7 7H2z" />
			</g>
		</svg>
	);
}
