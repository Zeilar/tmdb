const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_API_KEY;

if (typeof API_KEY !== "string") {
	throw new Error("No API key was provided, check the .env file.");
}

export function getMovies() {
	//
}
