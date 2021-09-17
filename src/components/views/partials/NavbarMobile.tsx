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
		<Box as="nav" display={{ base: "block", lg: "none" }}>
			<Flex alignItems="center" backgroundColor="gray.900" padding="1rem">
				<HamburgerIcon
					width="1.5rem"
					height="1.5rem"
					marginRight="1rem"
					onClick={() => setIsOpen(true)}
				/>
				<Heading color="accent" size="2xl" marginRight="2rem" as={NavLink} to="/" exact>
					TMDB
				</Heading>
			</Flex>
			<Flex
				ref={ref}
				minWidth="15rem"
				flexDirection="column"
				position="fixed"
				top="0"
				left="0"
				height="100%"
				transitionDuration="0.25s"
				backgroundColor="gray.900"
				boxShadow="xl"
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
					paddingY="0.75rem"
					paddingX="1rem"
					backgroundColor="blackAlpha.400"
					borderBottom="1px solid"
					borderBottomColor="gray.700"
				>
					<Heading color="accent">TMDB</Heading>
				</Box>
				<Box as="ul">
					<Box as="form" paddingY="0.75rem" paddingX="1rem" onSubmit={search}>
						<InputGroup>
							<InputLeftElement pointerEvents="none" children={<SearchIcon />} />
							<Input
								value={searchInput}
								onChange={e => setSearchInput(e.target.value)}
								size="md"
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
			<NavLink to={path} exact>
				<Heading size="md" paddingY="0.75rem" paddingX="1rem">
					{name}
				</Heading>
			</NavLink>
		</Box>
	);
}
