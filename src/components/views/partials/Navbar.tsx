import {
	Flex,
	Heading,
	InputLeftElement,
	InputGroup,
	Input,
	InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { NavLink, useHistory } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../../../styles/theme";
import { FormEvent, useState } from "react";

export function Navbar() {
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
		<nav>
			<Flex as="ul" alignItems="flex-end" marginBottom="3rem">
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
					<Navlink to="/popular" exact>
						<Heading size="md">Popular</Heading>
					</Navlink>
				</Navitem>
				<Navitem>
					<Navlink to="/genres" exact>
						<Heading size="md">Genres</Heading>
					</Navlink>
				</Navitem>
				<Navitem className="search">
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
		</nav>
	);
}

const Navitem = styled.div.attrs({ as: "li" })`
	list-style-type: none;
	margin-right: 2rem;
	&.search {
		margin-left: auto;
		margin-right: 0;
	}
`;

const Navlink = styled(NavLink)`
	&:hover {
		color: ${theme.colors.gray["300"]};
	}
	&.active {
		color: ${theme.colors.accent};
	}
`;
