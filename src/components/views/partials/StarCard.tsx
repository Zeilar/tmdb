import { Flex, Grid, Img, Text, Heading, useImage, Spinner } from "@chakra-ui/react";
import { getImageUrl } from "../../../services";
import { ICast } from "../../../types";
import { Link } from "react-router-dom";
import placeholder from "../../../assets/images/placeholder.png";

interface Props {
	person: ICast;
}

export function StarCard({ person }: Props) {
	const avatarPath = person.profile_path ? getImageUrl(person.profile_path) : placeholder;
	const avatarStatus = useImage({ src: avatarPath });

	return (
		<Grid gridTemplateColumns="100px 1fr" backgroundColor="gray.900">
			<Flex height="150px" backgroundColor="gray.700">
				{(avatarStatus === "pending" || avatarStatus === "loading") && (
					<Spinner margin="auto" color="accent" />
				)}
				{avatarStatus === "loaded" && <Img src={avatarPath} objectFit="cover" />}
			</Flex>
			<Flex flexDirection="column" padding="1rem">
				<Heading
					as={Link}
					fontSize="md"
					to={`/person/${person.id}`}
					_hover={{ color: "accent" }}
				>
					{person.name}
				</Heading>
				<Text marginTop="0.5rem">{person.character}</Text>
			</Flex>
		</Grid>
	);
}
