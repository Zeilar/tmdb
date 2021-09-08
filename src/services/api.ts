import { IMovieQuery } from "./../types/movie";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

if (typeof API_KEY !== "string") {
	throw new Error("No API key was provided, check the .env file.");
}

if (typeof axios.defaults.params !== "object") {
	axios.defaults.params = {};
}
axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.params["api_key"] = API_KEY;

export async function getLatestMovies() {
	try {
		const { data } = await axios.get<IMovieQuery>("/movie/now_playing");
		return data;
	} catch (error) {
		console.error("Failed fetching latest movies.");
		return null;
	}
}

export async function getMostPopularMovies() {
	try {
		const { data } = await axios.get<IMovieQuery>("/movie/popular");
		return data;
	} catch (error) {
		console.error("Failed fetching most popular movies.");
		return null;
	}
}

export async function getTopRatedMovies() {
	try {
		const { data } = await axios.get<IMovieQuery>("/movie/top_rated");
		return data;
	} catch (error) {
		console.error("Failed fetching top rated movies.");
		return null;
	}
}
