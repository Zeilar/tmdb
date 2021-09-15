import { Box, BoxProps } from "@chakra-ui/react";
import styled from "styled-components";
import { theme } from "../../styles/theme";

export default function PostThumbnailSkeleton({ ...props }: BoxProps) {
	return (
		<Box
			as={Wrapper}
			width={200}
			height={300}
			backgroundColor="gray.700"
			flexShrink={0}
			{...props}
		/>
	);
}
console.log(theme);
const Wrapper = styled.div`
	animation: pulse 1s ease-out infinite alternate;
	@keyframes pulse {
		to {
			background-color: ${theme.colors.gray["900"]};
		}
	}
`;
