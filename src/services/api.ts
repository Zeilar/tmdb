import { LatestMoviesQuery } from "./../types/movie";
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
	return await axios.get<LatestMoviesQuery>("/movie/now_playing");
}
