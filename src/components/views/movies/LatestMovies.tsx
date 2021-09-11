import { getLatestMovies } from "../../../services";
import { Movies } from "./Movies";

export function LatestMovies() {
	function callback(page?: number) {
		return getLatestMovies(page);
	}

	return <Movies queryID="latest-movies" callback={callback} />;
}
