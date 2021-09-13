import { Flex, Heading, InputLeftElement, InputGroup, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
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
				<Navitem style={{ marginLeft: "auto" }}>
					<InputGroup as="form" onSubmit={search}>
						<InputLeftElement
							pointerEvents="none"
							children={<SearchIcon color="gray.300" />}
						/>
						<Input
							type="text"
							placeholder="Search..."
							value={searchInput}
							onChange={e => setSearchInput(e.target.value)}
						/>
					</InputGroup>
				</Navitem>
			</Flex>
		</nav>
	);
}

const Navitem = styled.div.attrs({ as: "li" })`
	list-style-type: none;
	margin: 0 1rem;
`;

const Navlink = styled(NavLink)`
	&.active {
		color: ${theme.colors.accent};
	}
`;
