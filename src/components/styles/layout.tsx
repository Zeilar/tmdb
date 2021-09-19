import { Box, BoxProps } from "@chakra-ui/react";

export function GridContainer({ children, ...props }: BoxProps) {
	return (
		<Box backgroundColor="gray.900" padding="1rem" boxShadow="md" {...props}>
			{children}
		</Box>
	);
}
