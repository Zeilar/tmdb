import { Box } from "@chakra-ui/react";
import styled from "styled-components";

export default function PostThumbnailSkeleton() {
	return <Wrapper backgroundColor="gray.700" />;
}

const Wrapper = styled(Box)`
	animation: pulse 1s ease-out infinite alternate;
	@keyframes pulse {
		to {
			opacity: 0.5;
		}
	}
`;
