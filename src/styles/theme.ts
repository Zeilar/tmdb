import "@fontsource/raleway/400.css";
import "@fontsource/open-sans/700.css";
import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
	fonts: {
		heading: "Open Sans",
		body: "Raleway",
	},
});
