import { Grid, GridProps } from "@chakra-ui/react";

interface ISingleModelContainerProps extends GridProps {
	backdropUrl?: string;
}

export function SingleModelContainer({ backdropUrl, children }: ISingleModelContainerProps) {
	return (
		<Grid
			gridTemplateColumns={["repeat(1, 1fr)", "300px 1fr"]}
			zIndex={1}
			position="relative"
			padding="2rem"
			backgroundColor="gray.900"
			backgroundImage={backdropUrl}
			backgroundSize="cover"
			backgroundPosition="center"
			_after={
				backdropUrl
					? {
							content: `""`,
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							height: "100%",
							backgroundColor: "blackAlpha.900",
							zIndex: -1,
					  }
					: undefined
			}
		>
			{children}
		</Grid>
	);
}
