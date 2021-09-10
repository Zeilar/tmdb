import { Flex, FlexProps, Icon } from "@chakra-ui/react";
import { MouseEventHandler } from "react";

interface Props extends FlexProps {
	onClick?: MouseEventHandler<HTMLDivElement>;
}

export function FullscreenIcon({ onClick, ...props }: Props) {
	return (
		<Flex
			{...props}
			as="button"
			right="0.35rem"
			top="0.35rem"
			width="1.5rem"
			height="1.5rem"
			padding="0.5rem"
			position="absolute"
			justifyContent="center"
			alignItems="center"
			borderRadius={3}
			title="Fullscreen"
			onClick={onClick}
		>
			<Icon viewBox="0 0 122.88 122.87" fill="gray.100">
				<g>
					<path d="M122.88,77.63v41.12c0,2.28-1.85,4.12-4.12,4.12H77.33v-9.62h35.95c0-12.34,0-23.27,0-35.62H122.88L122.88,77.63z M77.39,9.53V0h41.37c2.28,0,4.12,1.85,4.12,4.12v41.18h-9.63V9.53H77.39L77.39,9.53z M9.63,45.24H0V4.12C0,1.85,1.85,0,4.12,0h41 v9.64H9.63V45.24L9.63,45.24z M45.07,113.27v9.6H4.12c-2.28,0-4.12-1.85-4.12-4.13V77.57h9.63v35.71H45.07L45.07,113.27z" />
				</g>
			</Icon>
		</Flex>
	);
}
