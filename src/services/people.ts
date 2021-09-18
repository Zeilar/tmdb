import axios from "axios";
import { ISinglePerson } from "../types";

export async function getMoviesByPersonId(id: number) {
	try {
		const { data } = await axios.get<ISinglePerson>("/discover/movie", {
			params: { with_cast: id },
		});
		return data;
	} catch (error) {
		console.error(`Failed fetching movie with id ${id}.`);
		return null;
	}
}

export async function getPersonById(id: number) {
	try {
		const { data: person } = await axios.get<ISinglePerson>(`/person/${id}`);
		const movies = await getMoviesByPersonId(id);
		return { person, movies };
	} catch (error) {
		console.error(`Failed fetching person with id ${id}.`);
		return null;
	}
}
