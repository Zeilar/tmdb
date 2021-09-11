import { Container, Flex } from "@chakra-ui/react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { usePosterViewerContext } from "../contexts";
import { MoviePosterViewer } from "./movie";
import * as Views from "./views";

export default function Router() {
	const { activePosterPath } = usePosterViewerContext();

	return (
		<Flex minHeight="100vh" bgColor="gray.800">
			{activePosterPath != null && <MoviePosterViewer path={activePosterPath} />}
			<Container maxWidth="full" width="container.xl" color="white">
				<BrowserRouter>
					<Flex flexDirection="column" paddingY="5rem">
						<Views.Navbar />
						<Views.ScrollToTop />
						<Switch>
							<Route exact path="/" component={Views.Home} />
							<Route exact path="/movie/:id/:title?" component={Views.Home} />
							<Route exact path="/latest" component={Views.LatestMovies} />
							<Route exact path="/top" component={Views.TopMovies} />
							<Route exact path="/popular" component={Views.PopularMovies} />
							<Route exact path="/search" component={Views.Movies} />
							<Route>404</Route>
						</Switch>
					</Flex>
				</BrowserRouter>
			</Container>
		</Flex>
	);
}
