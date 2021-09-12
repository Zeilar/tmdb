import { Flex, Box, Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { getAllGenres } from "../../../services";
import { IGenre } from "../../../types/genre";

interface Props {
	onChange(genres: IGenre[]): void;
}

export function GenresList({ onChange }: Props) {
	const genresQuery = useQuery("genres", getAllGenres);
	const [pickedGenres, setPickedGenres] = useState<IGenre[]>([]);

	function clearAll() {
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

	return (
		<Flex marginBottom="2rem">
			{!genresQuery.isLoading && (
				<Flex flexDirection="column">
					<Flex flexWrap="wrap" gridGap="0.5rem">
						<Button type="button" variant="outline" onClick={clearAll}>
							Clear all
						</Button>
						{genresQuery.data?.map(genre => (
							<Box
								backgroundColor={isGenrePicked(genre) ? "gray.700" : "gray.900"}
								paddingX="1rem"
								paddingY="0.5rem"
								rounded="3xl"
								as="button"
								boxShadow="sm"
								key={genre.id}
								onClick={() => toggleGenre(genre)}
							>
								{genre.name}
							</Box>
						))}
					</Flex>
				</Flex>
			)}
		</Flex>
	);
}
