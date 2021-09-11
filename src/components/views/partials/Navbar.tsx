import { Box, Flex, Heading } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../../../styles/theme";

export function Navbar() {
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
					<Navlink to="/search" exact>
						<Heading size="md">Search</Heading>
					</Navlink>
				</Navitem>
			</Flex>
		</nav>
	);
}

const Navitem = styled(Box).attrs({ as: "li" })`
	list-style-type: none;
	margin: 0 1rem;
`;

const Navlink = styled(NavLink)`
	&.active {
		color: ${theme.colors.accent};
	}
`;
