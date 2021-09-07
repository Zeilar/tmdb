import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.render(
	<React.StrictMode>
		<ChakraProvider>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
