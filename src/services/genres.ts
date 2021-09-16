import { IGenresQuery } from "../types";
import axios from "axios";

export async function getAllGenres() {
	try {
		const { data } = await axios.get<IGenresQuery>("/genre/movie/list");
		return data.genres;
	} catch (error) {
		console.error("Failed fetching all genres.");
		return null;
	}
}
