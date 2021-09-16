import { Box, BoxProps } from "@chakra-ui/react";
import { NavLink, NavLinkProps } from "react-router-dom";

export function Navitem({ children, ...props }: BoxProps) {
	return (
		<Box as="li" listStyleType="none" marginRight="2rem" {...props}>
			{children}
		</Box>
	);
}

export function Navlink({ to, children, ...props }: NavLinkProps & BoxProps) {
	return (
		<Box
			as={NavLink}
			to={to}
			sx={{ "&.active": { color: "accent" } }}
			_hover={{ color: "gray.300" }}
			{...props}
		>
			{children}
		</Box>
	);
}
