import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getPersonById } from "../../services";
import { Box, Flex, Heading, Img, Text, useImage, Spinner, Grid } from "@chakra-ui/react";
import { getImageUrl } from "../../services";
import PostThumbnailSkeleton from "../skeleton/PostThumbnailSkeleton";
import placeholder from "../../assets/images/placeholder.png";
import { getGender } from "../../helpers";
import { MovieGallery } from "../movie";
import { GridContainer } from "../styles";

interface IParams {
	id?: string | undefined;
}

export function SinglePerson() {
	const { id } = useParams<IParams>();
	const { data, isLoading, isError } = useQuery(
		["person", Number(id)],
		() => getPersonById(Number(id)),
		{ enabled: id !== undefined }
	);
	const posterUrl = data?.person.profile_path
		? getImageUrl(data.person.profile_path, "w300")
		: placeholder;
	const posterStatus = useImage({ src: posterUrl });

	if (isError) {
		return <Heading>Something went wrong!</Heading>;
	}

	if (!isLoading && !data?.person) {
		return <Heading>That person could not be found.</Heading>;
	}

	if (isLoading || !data) {
		return <Spinner color="accent" margin="auto" size="xl" />;
	}

	const { person } = data;

	return (
		<Flex flexDirection="column">
			<Grid gridTemplateColumns={["repeat(1, 1fr)", "300px 1fr"]}>
				<GridContainer alignSelf="start">
					<Box backgroundColor="gray.700" position="relative">
						{posterStatus === "loading" && (
							<PostThumbnailSkeleton minHeight={450} width="100%" height="100%" />
						)}
						{posterStatus === "loaded" && (
							<Img src={posterUrl} objectFit="cover" height="100%" width="100%" />
						)}
					</Box>
				</GridContainer>
				<GridContainer
					marginLeft={["0", "0.5rem"]}
					marginTop={["0.5rem", "0"]}
					flexDirection="column"
				>
					<Heading fontSize={["2xl", "4xl"]} marginTop={["1rem", "0"]}>
						{person.name}
					</Heading>
					<Flex
						justifyContent={["space-between", "normal"]}
						marginTop={["2rem", "1rem"]}
						marginBottom="2rem"
						flexWrap="wrap"
						gridGap="2rem"
					>
						<Flex flexDirection="column">
							<Heading marginBottom="0.25rem" size="md">
								Gender
							</Heading>
							<Text>{getGender(person.gender)}</Text>
						</Flex>
						{person.birthday && (
							<Flex flexDirection="column">
								<Heading marginBottom="0.25rem" size="md">
									Birthday
								</Heading>
								<Text>{person.birthday}</Text>
							</Flex>
						)}
						{person.place_of_birth && (
							<Flex flexDirection="column">
								<Heading marginBottom="0.25rem" size="md">
									Birthplace
								</Heading>
								<Text>{person.place_of_birth}</Text>
							</Flex>
						)}
						{person.deathday && (
							<Flex flexDirection="column">
								<Heading marginBottom="0.25rem" size="md">
									Deathday
								</Heading>
								<Text>{person.deathday}</Text>
							</Flex>
						)}
					</Flex>
					{person.biography && (
						<>
							<Heading size="md" marginTop="auto">
								Biography
							</Heading>
							<Text marginTop="0.5rem">{person.biography}</Text>
						</>
					)}
				</GridContainer>
			</Grid>
			<MovieGallery
				loading={isLoading}
				movies={data.movies ?? []}
				marginTop="0.5rem"
				header="Known for"
			/>
		</Flex>
	);
}
