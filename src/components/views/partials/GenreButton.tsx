import { Box, BoxProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props extends BoxProps {
	onClick?: () => void;
	active?: boolean;
	children: ReactNode;
}

export function GenreButton({ active, onClick, children, ...props }: Props) {
	return (
		<Box
			backgroundColor={active ? "gray.700" : "gray.900"}
			color={active ? "accent" : undefined}
			paddingX="1rem"
			paddingY="0.5rem"
			rounded="3xl"
			as="button"
			boxShadow="sm"
			onClick={onClick}
			_hover={{ color: "accent" }}
			{...props}
		>
			{children}
		</Box>
	);
}
