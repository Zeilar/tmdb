import "@fontsource/raleway/400.css";
import "@fontsource/open-sans/700.css";
import { extendTheme } from "@chakra-ui/react";

const accentColor = "#47daff";

export const theme = extendTheme({
	styles: {
		global: {
			body: {
				overflow: "overlay",
				"::-webkit-scrollbar-thumb": {
					backgroundClip: "padding-box",
					border: "4px solid transparent",
				},
			},
			"::-webkit-scrollbar": {
				width: "0.9rem",
				height: "0.35rem",
			},
			"::-webkit-scrollbar-thumb": {
				backgroundColor: accentColor,
				borderRadius: 100,
			},
		},
	},
	colors: {
		accent: accentColor,
	},
	fonts: {
		heading: "Open Sans",
		body: "Raleway",
	},
});
