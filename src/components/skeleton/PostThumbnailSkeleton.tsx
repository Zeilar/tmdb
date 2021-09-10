import { Box } from "@chakra-ui/react";
import styled from "styled-components";

export default function PostThumbnailSkeleton() {
	return <Box as={Wrapper} width={300} height={200} backgroundColor="gray.700" flexShrink={0} />;
}

const Wrapper = styled.div`
	animation: pulse 1s ease-out infinite alternate;
	@keyframes pulse {
		to {
			opacity: 0.25;
		}
	}
`;
