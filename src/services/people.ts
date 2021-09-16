import axios from "axios";
import { ISinglePerson } from "../types";

export async function getPersonById(id: number) {
	try {
		const { data } = await axios.get<ISinglePerson>(`/person/${id}`);
		return data;
	} catch (error) {
		console.error(`Failed fetching movie with id ${id}.`);
	}
}
