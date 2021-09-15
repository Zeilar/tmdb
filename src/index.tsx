import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { theme } from "./styles/theme";
import { PosterViewerContextProvider } from "./contexts";
import axios from "axios";
import { ThemeProvider } from "styled-components";

const API_KEY = process.env.REACT_APP_API_KEY;

if (typeof API_KEY !== "string") {
	throw new Error("No API key was provided, check the .env file.");
}

if (typeof axios.defaults.params !== "object") {
	axios.defaults.params = {};
}
axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.params["api_key"] = API_KEY;

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: false,
		},
	},
});

ReactDOM.render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={theme}>
					<PosterViewerContextProvider>
						<App />
					</PosterViewerContextProvider>
				</ThemeProvider>
			</QueryClientProvider>
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
