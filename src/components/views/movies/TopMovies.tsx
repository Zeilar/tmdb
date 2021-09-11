import { getTopMovies } from "../../../services";
import { Movies } from "./Movies";

export function TopMovies() {
	function callback(page?: number) {
		return getTopMovies(page);
	}

	return <Movies queryID="top-movies" callback={callback} />;
}
