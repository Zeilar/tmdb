import { IMovieQuery } from "./../types/movie";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

if (typeof API_KEY !== "string") {
	throw new Error("No API key was provided, check the .env file.");
}

if (typeof axios.defaults.params !== "object") {
	axios.defaults.params = {};
}
axios.defaults.baseURL = "https://api.themoviedb.org/3/movie";
axios.defaults.params["api_key"] = API_KEY;

async function getManyMovies(path: string, errorMsg: string) {
	try {
		const { data } = await axios.get<IMovieQuery>(path);
		return data;
	} catch (error) {
		console.error(errorMsg);
		return null;
	}
}

export async function getLatestMovies() {
	return await getManyMovies("now_playing", "Failed fetching latest movies.");
}

export async function getMostPopularMovies() {
	return await getManyMovies("/popular", "Failed fetching most popular movies.");
}

export async function getTopRatedMovies() {
	return await getManyMovies("/top_rated", "Failed fetching top rated movies.");
}
