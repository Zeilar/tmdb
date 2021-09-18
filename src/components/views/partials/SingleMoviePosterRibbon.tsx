import { Box, Text } from "@chakra-ui/react";
import { IMovieStatus } from "../../../types";

interface Props {
	status: IMovieStatus;
}

export function SingleMoviePosterRibbon({ status }: Props) {
	return (
		<Box top="0" left="0" position="absolute" width={115} height={115} overflow="hidden">
			<Text
				paddingY="0.25rem"
				fontSize="sm"
				backgroundColor="gray.900"
				position="absolute"
				width={210}
				top="30px"
				right="-35px"
				textAlign="center"
				userSelect="none"
				transform="rotate(-45deg)"
			>
				{status}
			</Text>
		</Box>
	);
}
