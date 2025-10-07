import { useState, type ReactNode } from "react";

interface ReadMoreProps {
	children: ReactNode;
	buttonText?: string;
	initiallyVisible?: boolean;
}

export default function ReadMore({
	children,
	buttonText = "Read More",
	initiallyVisible = false,
}: ReadMoreProps) {
	const [expanded, setExpanded] = useState(initiallyVisible);

	return (
		<div>
			{!expanded && (
				<button
					type="button"
					className="underline"
					onClick={() => setExpanded(true)}
				>
					{buttonText}
				</button>
			)}

			{expanded && <div className="mt-2 space-y-2 *:*:pb-2">{children}</div>}
		</div>
	);
}
