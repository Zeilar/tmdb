import { getTopMovies } from "../../../services";
import { IParams } from "../../../types";
import { Movies } from "./";

export function TopMovies() {
	function callback({ page }: IParams) {
		return getTopMovies(page);
	}

	return <Movies queryID="top-movies" callback={callback} />;
}
