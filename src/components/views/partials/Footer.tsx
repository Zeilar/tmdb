import { Box } from "@chakra-ui/react";

export function Footer() {
	return (
		<Box
			as="footer"
			backgroundColor="gray.900"
			padding="1rem"
			textAlign="center"
			width="100%"
			marginTop="auto"
			boxShadow="md"
		>
			Developed using The Movie Database API
		</Box>
	);
}
