import "@fontsource/raleway/400.css";
import "@fontsource/open-sans/700.css";
import { extendTheme } from "@chakra-ui/react";

const colors = {
	accentColor: "#47daff",
};

export const theme = extendTheme({
	initialColorMode: "dark",
	useSystemColorMode: false,
	components: {
		Link: {
			baseStyle: {
				boxShadow: "none !important",
			},
		},
	},
	styles: {
		global: {
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
			"::-webkit-scrollbar": {
				width: "0.9rem",
				height: "0.35rem",
			},
			"::-webkit-scrollbar-thumb": {
				backgroundColor: colors.accentColor,
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
