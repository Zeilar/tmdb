import { useImage, Image, AbsoluteCenter, Spinner, Flex, Box } from "@chakra-ui/react";
import { usePosterViewerContext } from "../../contexts";
import { useOnClickOutside } from "../../hooks";
import { CloseIcon } from "@chakra-ui/icons";

interface Props {
	path: string;
}

export function MoviePosterViewer({ path }: Props) {
	const status = useImage({ src: path });
	const { closeViewer } = usePosterViewerContext();

	const container = useOnClickOutside<HTMLDivElement>(closeViewer);

	return (
		<Flex
			position="fixed"
			width="100%"
			height="100%"
			backgroundColor="blackAlpha.800"
			justifyContent="center"
			zIndex={100}
		>
			<Box ref={container}>
				<CloseIcon
					zIndex={1000}
					cursor="pointer"
					position="absolute"
					width="1.25rem"
					height="1.25rem"
					right="1.5rem"
					top="1.5rem"
					color="gray.100"
					_hover={{ color: "accent" }}
					onClick={closeViewer}
				/>
				{status === "loading" && (
					<AbsoluteCenter>
						<Spinner color="accent" />
					</AbsoluteCenter>
				)}
				<Image src={path} height="100%" />
			</Box>
		</Flex>
	);
}
