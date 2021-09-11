import { getPopularMovies } from "../../../services";
import { Movies } from "./Movies";

export function PopularMovies() {
	function callback(page?: number) {
		return getPopularMovies(page);
	}

	return <Movies queryID="popular-movies" callback={callback} />;
}
