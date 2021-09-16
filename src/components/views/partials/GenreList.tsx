import { Flex, Box, Button, Spinner, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getAllGenres } from "../../../services";
import { IGenre } from "../../../types";

interface Props {
	onChange(genres: IGenre[]): void;
}

export function GenreList({ onChange }: Props) {
	const genresQuery = useQuery("genres", getAllGenres);
	const [pickedGenres, setPickedGenres] = useState<IGenre[]>([]);

	function reset() {
		if (pickedGenres.length > 0) {
			setPickedGenres([]);
		}
	}

	function isGenrePicked(genre: IGenre) {
		return pickedGenres.some(element => element.id === genre.id);
	}

	function toggleGenre(genre: IGenre) {
		if (isGenrePicked(genre)) {
			setPickedGenres(genres => genres.filter(element => element.id !== genre.id));
		} else {
			setPickedGenres(genres => [...genres, genre]);
		}
	}

	useEffect(() => {
		onChange(pickedGenres);
	}, [pickedGenres, onChange]);

	if (genresQuery.isError) {
		return (
			<Flex marginBottom="2rem">
				<Heading>Something went wrong loading the genres!</Heading>
			</Flex>
		);
	}

	return (
		<Flex marginBottom="2rem">
			{genresQuery.isLoading && <Spinner color="accent" />}
			{!genresQuery.isLoading && (
				<Flex flexWrap="wrap" gridGap="0.5rem">
					<Button type="button" variant="outline" onClick={reset}>
						Reset
					</Button>
					{genresQuery.data?.map(genre => (
						<Box
							backgroundColor={isGenrePicked(genre) ? "gray.700" : "gray.900"}
							color={isGenrePicked(genre) ? "accent" : undefined}
							paddingX="1rem"
							paddingY="0.5rem"
							rounded="3xl"
							as="button"
							boxShadow="sm"
							key={genre.id}
							onClick={() => toggleGenre(genre)}
							_hover={{ color: "accent" }}
						>
							{genre.name}
						</Box>
					))}
				</Flex>
			)}
		</Flex>
	);
}
