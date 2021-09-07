import { Flex, Switch } from "@chakra-ui/react";
import { BrowserRouter, Route } from "react-router-dom";
import { Home } from "./views";

export default function Router() {
	return (
		<Flex height="100vh" alignItems="center" justifyContent="center">
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Home} />
				</Switch>
			</BrowserRouter>
		</Flex>
	);
}
