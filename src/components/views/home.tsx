import { Flex } from "@chakra-ui/react";
import { useState, useEffect, ReactNode } from "react";

export function Home() {
	console.log(process.env.REACT_APP_API_KEY);
	return <Flex>hello world</Flex>;
}
