import { Box } from "@chakra-ui/react";
import { getPopularMovies, getTrendingMovies } from "../../../services";
import { Movies } from "./";
import { IParams, ITrendingWindow } from "../../../types/movie";
import { useParams } from "react-router-dom";
import { Navlink } from "../../styles";

export function PopularMovies() {
	const { window } = useParams<{ window?: ITrendingWindow | undefined }>();

	function callback({ page }: IParams) {
		if (window) {
			return getTrendingMovies(window, page);
		}
		return getPopularMovies(page);
	}

	return (
		<Box>
			<Box as="nav" fontSize="1.5rem" fontWeight="600" marginBottom="1rem">
				<Navlink marginRight="1rem" to="/popular" exact>
					All
				</Navlink>
				<Navlink marginRight="1rem" to="/popular/day" exact>
					Daily
				</Navlink>
				<Navlink to="/popular/week" exact>
					Weekly
				</Navlink>
			</Box>
			<Movies queryID={["popular-movies", window]} callback={callback} />
		</Box>
	);
}
