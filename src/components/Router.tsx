import { Flex } from "@chakra-ui/react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./views";

export default function Router() {
	return (
		<Flex height="100vh" alignItems="center" justifyContent="center" bgColor="gray.800">
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Home} />
				</Switch>
			</BrowserRouter>
		</Flex>
	);
}
