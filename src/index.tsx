import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { theme } from "./styles/theme";
import { PosterViewerContextProvider } from "./contexts";

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
				<PosterViewerContextProvider>
					<App />
				</PosterViewerContextProvider>
			</QueryClientProvider>
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
