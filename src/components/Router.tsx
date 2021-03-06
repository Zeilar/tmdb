import { Container, Flex, Heading } from "@chakra-ui/react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { usePosterViewerContext } from "../contexts";
import { MoviePosterViewer } from "./movie";
import * as Views from "./views";
import { Footer } from "./views";

export default function Router() {
	const { activePosterPath } = usePosterViewerContext();

	return (
		<Flex flexDirection="column" minHeight="100vh" bgColor="gray.800">
			{activePosterPath != null && <MoviePosterViewer path={activePosterPath} />}
			<Container padding="0" maxWidth="full" width="container.xl" color="white">
				<BrowserRouter>
					<Views.Navbar />
					<Flex height="100%" flexDirection="column" padding="1rem">
						<Views.ScrollToTop />
						<Switch>
							<Route exact path="/" component={Views.Home} />
							<Route exact path="/movie/:id" component={Views.SingleMovie} />
							<Route exact path="/latest" component={Views.LatestMovies} />
							<Route exact path="/top" component={Views.TopMovies} />
							<Route exact path="/popular/:window?" component={Views.PopularMovies} />
							<Route exact path="/genres" component={Views.Genres} />
							<Route exact path="/search" component={Views.Search} />
							<Route exact path="/person/:id" component={Views.SinglePerson} />
							<Route>
								<Heading>That page could not be found.</Heading>
							</Route>
						</Switch>
					</Flex>
				</BrowserRouter>
			</Container>
			<Footer />
		</Flex>
	);
}
