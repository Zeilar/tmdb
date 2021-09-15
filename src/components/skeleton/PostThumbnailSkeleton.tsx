import { Box, BoxProps, keyframes } from "@chakra-ui/react";
import { theme } from "../../styles/theme";

export default function PostThumbnailSkeleton({ ...props }: BoxProps) {
	return (
		<Box
			animation={`${pulse} 1s ease-out infinite alternate`}
			width={200}
			height={300}
			backgroundColor="gray.700"
			flexShrink={0}
			{...props}
		/>
	);
}

const pulse = keyframes`
    to {
        background-color: ${theme.colors.gray["900"]};
    }
`;
