import { Spinner, Button } from "@chakra-ui/react";

export function MovieListSpinner() {
	return <Spinner color="accent" size="xl" marginX="auto" marginY="5rem" />;
}

interface IMovieListLoadMoreButtonProps {
	isLoading: boolean;
	onClick(): void;
}
export function MovieListLoadMoreButton({ isLoading, onClick }: IMovieListLoadMoreButtonProps) {
	return (
		<Button
			isLoading={isLoading}
			loadingText="Loading"
			variant="outline"
			spinnerPlacement="start"
			borderColor="accent"
			color="accent"
			marginY="5rem"
			marginX="auto"
			onClick={onClick}
		>
			Load More
		</Button>
	);
}
