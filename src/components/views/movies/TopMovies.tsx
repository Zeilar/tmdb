import { getTopMovies } from "../../../services";
import { IParams } from "../../../types/movie";
import { Movies } from "./Movies";

export function TopMovies() {
	function callback({ page }: IParams) {
		return getTopMovies(page);
	}

	return <Movies queryID="top-movies" callback={callback} />;
}
