import { Flex } from "@chakra-ui/react";
import { ChevronUpIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";

export function ScrollToTop() {
	const [active, setActive] = useState(false);

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}

	useEffect(() => {
		function scrollHandler() {
			setActive(window.scrollY > window.innerHeight);
		}
		document.addEventListener("scroll", scrollHandler);
		return () => {
			document.removeEventListener("scroll", scrollHandler);
		};
	}, []);

	return (
		<Flex
			opacity={active ? 1 : 0}
			as="button"
			alignItems="center"
			justifyContent="center"
			position="fixed"
			bottom="5rem"
			right="5rem"
			backgroundColor="blackAlpha.300"
			border="2px"
			borderColor="accent"
			padding="0.5rem"
			rounded="full"
			transition="opacity 0.1s linear"
			onClick={scrollToTop}
			_hover={{ backgroundColor: "blackAlpha.500" }}
		>
			<ChevronUpIcon fontSize="1.5rem" />
		</Flex>
	);
}
