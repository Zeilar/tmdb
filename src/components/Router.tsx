import { Container, Flex } from "@chakra-ui/react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { usePosterViewerContext } from "../contexts";
import { MoviePosterViewer } from "./movie/MoviePosterViewer";
import { Home, LatestMovies } from "./views";

export default function Router() {
	const { activePosterPath } = usePosterViewerContext();

	return (
		<Flex minHeight="100vh" bgColor="gray.800">
			{activePosterPath != null && <MoviePosterViewer path={activePosterPath} />}
			<Container maxWidth="full" width="container.xl" color="white">
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/movie/:id/:title?" component={Home} />
						<Route exact path="/latest" component={LatestMovies} />
						<Route exact path="/top" component={Home} />
						<Route exact path="/popular" component={Home} />
						<Route>404</Route>
					</Switch>
				</BrowserRouter>
			</Container>
		</Flex>
	);
}
