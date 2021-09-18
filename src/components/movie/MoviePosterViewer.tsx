import { useImage, Image, AbsoluteCenter, Spinner, Flex, Button } from "@chakra-ui/react";
import { usePosterViewerContext } from "../../contexts";
import { useOnClickOutside } from "../../hooks";
import { CloseIcon } from "@chakra-ui/icons";
import useRemoveScroll from "../../hooks/useRemoveScroll";

interface Props {
	path: string;
}

export function MoviePosterViewer({ path }: Props) {
	const status = useImage({ src: path });
	const { closeViewer, active } = usePosterViewerContext();
	useRemoveScroll(active);

	const ref = useOnClickOutside<HTMLDivElement>(closeViewer);

	if (status === "failed") {
		closeViewer();
		return null;
	}

	return (
		<Flex
			position="fixed"
			width="100%"
			height="100%"
			backgroundColor="blackAlpha.800"
			justifyContent="center"
			zIndex={2000}
		>
			<Flex position="relative" justifyContent="center" ref={ref}>
				{status === "loading" && (
					<AbsoluteCenter>
						<Spinner color="accent" size="xl" />
					</AbsoluteCenter>
				)}
				{status === "loaded" && (
					<>
						<Button
							backgroundColor="gray.800"
							onClick={closeViewer}
							position={["absolute", "fixed"]}
							width="2.5rem"
							height="2.5rem"
							right="1.5rem"
							top="1.5rem"
							zIndex={1000}
							_hover={{}}
							_active={{}}
						>
							<CloseIcon backgroundColor="blackAlpha.700" color="gray.100" />
						</Button>
						<Image objectFit="cover" src={path} maxHeight="100%" />
					</>
				)}
			</Flex>
		</Flex>
	);
}
