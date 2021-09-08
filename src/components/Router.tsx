import { Container, Flex } from "@chakra-ui/react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./views";

export default function Router() {
	return (
		<Flex height="100vh" bgColor="gray.800">
			<Container maxWidth="full" width="container.xl" color="white">
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/movie/:id/:title?" component={Home} />
						<Route exact path="/latest/:page?" component={Home} />
						<Route>404</Route>
					</Switch>
				</BrowserRouter>
			</Container>
		</Flex>
	);
}
