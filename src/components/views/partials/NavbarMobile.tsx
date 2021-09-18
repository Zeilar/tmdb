import {
	Flex,
	Heading,
	Box,
	Button,
	InputGroup,
	InputLeftElement,
	Input,
	InputRightElement,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon, SearchIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { NavLink, useHistory } from "react-router-dom";
import { FormEvent, useState } from "react";
import { useOnClickOutside } from "../../../hooks";
import useRemoveScroll from "../../../hooks/useRemoveScroll";

export function NavbarMobile() {
	const [searchInput, setSearchInput] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const { push } = useHistory();

	const ref = useOnClickOutside<HTMLDivElement>(close);

	useRemoveScroll(isOpen);

	function close() {
		setIsOpen(false);
	}

	function search(e: FormEvent) {
		e.preventDefault();
		close();
		push(`/search?query=${encodeURI(searchInput)}`);
	}

	function clearSearch() {
		setSearchInput("");
	}

	return (
		<Box
			as="nav"
			display={{ base: "block", lg: "none" }}
			position="sticky"
			top="0"
			zIndex={1000}
		>
			<Flex alignItems="center" backgroundColor="gray.900" padding="1rem">
				<Button variant="unstyled" backgroundColor="gray.800" marginRight="1rem">
					<HamburgerIcon width="1.5rem" height="1.5rem" onClick={() => setIsOpen(true)} />
				</Button>
				<Box as="form" onSubmit={search} marginLeft="auto">
					<InputGroup>
						<InputLeftElement pointerEvents="none" children={<SearchIcon />} />
						<Input
							value={searchInput}
							onChange={e => setSearchInput(e.target.value)}
							placeholder="Search..."
						/>
						<InputRightElement
							as="button"
							type="button"
							visibility={searchInput !== "" ? "visible" : "hidden"}
							children={<SmallCloseIcon cursor="pointer" color="gray.100" />}
							onClick={clearSearch}
						/>
					</InputGroup>
				</Box>
			</Flex>
			<Flex
				ref={ref}
				minWidth="12rem"
				flexDirection="column"
				position="fixed"
				top="0"
				left="0"
				height="100%"
				transitionDuration="0.25s"
				backgroundColor="gray.900"
				boxShadow={isOpen ? "xl" : undefined}
				transform={`translateX(${isOpen ? "0" : "-100%"})`}
				zIndex={100}
			>
				<Button
					variant="unstyled"
					position="absolute"
					right="0.75rem"
					top="0.75rem"
					_hover={{ color: "accent" }}
				>
					<CloseIcon onClick={close} />
				</Button>
				<Box
					as={NavLink}
					paddingY="0.75rem"
					paddingX="1rem"
					backgroundColor="blackAlpha.400"
					onClick={close}
					to="/"
				>
					<Heading color="accent">TMDB</Heading>
				</Box>
				<Box as="ul">
					<NavItem onClick={close} name="Latest" path="/latest" />
					<NavItem onClick={close} name="Top" path="/top" />
					<NavItem onClick={close} name="Popular" path="/popular" />
					<NavItem onClick={close} name="Genres" path="/genres" />
				</Box>
			</Flex>
		</Box>
	);
}

function NavItem({ name, path, onClick }: { name: string; path: string; onClick?: () => void }) {
	return (
		<Box
			as="li"
			listStyleType="none"
			_hover={{ backgroundColor: "gray.700" }}
			onClick={onClick}
		>
			<Box as={NavLink} to={path} exact sx={{ "&.active": { color: "accent" } }}>
				<Heading size="md" paddingY="0.75rem" paddingX="1rem">
					{name}
				</Heading>
			</Box>
		</Box>
	);
}
