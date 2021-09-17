import {
	Flex,
	Heading,
	InputLeftElement,
	InputGroup,
	Input,
	InputRightElement,
	Box,
} from "@chakra-ui/react";
import { SearchIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { NavLink, useHistory } from "react-router-dom";
import { FormEvent, useState } from "react";
import { Navitem, Navlink } from "../../styles";

export function NavbarDesktop() {
	const [searchInput, setSearchInput] = useState("");
	const { push } = useHistory();

	function search(e: FormEvent) {
		e.preventDefault();
		push(`/search?query=${encodeURI(searchInput)}`);
	}

	function clearSearch() {
		setSearchInput("");
	}

	return (
		<Box as="nav" display={{ base: "none", lg: "block" }} marginY="3rem">
			<Flex as="ul" alignItems="flex-end">
				<Heading color="accent" size="2xl" marginRight="2rem" as={NavLink} to="/" exact>
					TMDB
				</Heading>
				<Navitem>
					<Navlink to="/latest" exact>
						<Heading size="md">Latest</Heading>
					</Navlink>
				</Navitem>
				<Navitem>
					<Navlink to="/top" exact>
						<Heading size="md">Top</Heading>
					</Navlink>
				</Navitem>
				<Navitem>
					<Navlink to="/popular">
						<Heading size="md">Popular</Heading>
					</Navlink>
				</Navitem>
				<Navitem>
					<Navlink to="/genres" exact>
						<Heading size="md">Genres</Heading>
					</Navlink>
				</Navitem>
				<Navitem marginLeft="auto" marginRight="0">
					<InputGroup as="form" onSubmit={search}>
						<InputLeftElement
							pointerEvents="none"
							children={<SearchIcon color="gray.100" />}
						/>
						<Input
							type="text"
							placeholder="Search..."
							variant="flushed"
							value={searchInput}
							onChange={e => setSearchInput(e.target.value)}
						/>
						<InputRightElement
							as="button"
							type="button"
							visibility={searchInput !== "" ? "visible" : "hidden"}
							children={<SmallCloseIcon cursor="pointer" color="gray.100" />}
							onClick={clearSearch}
						/>
					</InputGroup>
				</Navitem>
			</Flex>
		</Box>
	);
}
