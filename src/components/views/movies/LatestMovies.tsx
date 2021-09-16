import { getLatestMovies } from "../../../services";
import { IParams } from "../../../types/movie";
import { Movies } from "./";

export function LatestMovies() {
	function callback({ page }: IParams) {
		return getLatestMovies(page);
	}

	return <Movies queryID="latest-movies" callback={callback} />;
}
