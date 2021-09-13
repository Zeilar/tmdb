import "@fontsource/raleway/400.css";
import "@fontsource/open-sans/700.css";
import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const colors = {
	accent: "#47daff",
};

const config: ThemeConfig = {
	initialColorMode: "dark",
	useSystemColorMode: false,
};

export const theme = extendTheme({
	config,
	components: {
		Link: {
			baseStyle: {
				boxShadow: "none !important",
			},
		},
	},
	styles: {
		global: {
			"::selection": {
				backgroundColor: "blackAlpha.500",
				color: colors.accent,
			},
			body: {
				overflow: "overlay",
				"::-webkit-scrollbar-thumb": {
					backgroundClip: "padding-box",
					border: "4px solid transparent",
				},
			},
			button: {
				outline: 0,
			},
			"img, svg, ::placeholder": {
				userSelect: "none",
			},
			"::-webkit-scrollbar": {
				width: "0.9rem",
				height: "0.5rem",
			},
			"::-webkit-scrollbar-thumb": {
				backgroundColor: colors.accent,
				borderRadius: 100,
			},
		},
	},
	colors,
	fonts: {
		heading: "Open Sans",
		body: "Raleway",
	},
});
