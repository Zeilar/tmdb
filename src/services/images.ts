const BASE_URL = "https://image.tmdb.org/t/p";

export function getImageUrl(path: string, size: string = "w500") {
	return `${BASE_URL}/${size}/${path}`;
}
