import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import { useQuery } from "react-query";
import { getLatestMovies } from "../../services";

export function Home() {
	const [page, setPage] = useState(1);
	const latestMovieQuery = useQuery(["movies-latest", page], getLatestMovies);

	console.log(latestMovieQuery.data, latestMovieQuery.isError);

	return <Flex>TMDB</Flex>;
}
