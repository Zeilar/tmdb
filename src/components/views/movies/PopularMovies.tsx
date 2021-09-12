import { getPopularMovies } from "../../../services";
import { IParams } from "../../../types/movie";
import { Movies } from "./Movies";

export function PopularMovies() {
	function callback({ page }: IParams) {
		return getPopularMovies(page);
	}

	return <Movies queryID="popular-movies" callback={callback} />;
}
