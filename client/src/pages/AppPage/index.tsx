import {
	Box,
	Container,
	Divider,
	Flex,
	Heading,
	Highlight,
	Text,
} from "@chakra-ui/react";

const AppPage: React.FC = () => {
	return (
		<>
			<Container maxW="container.lg" bg="gray.50" p="8" minH="100vh">
				<Text pb="4">STATUS: WHAR</Text>
				<Divider />
				<Heading m="8" textAlign="center">
					<Highlight
						query="Topic:"
						styles={{ p: "1", bg: "green.100", rounded: "6" }}>
						Topic: Something
					</Highlight>
				</Heading>
				<Divider />
				<Flex
					gap="12"
					wrap="wrap"
					flexDirection="row"
					justifyContent="center"
					alignItems="center"
					p="4">
					<Box
						maxW="sm"
						border="2px"
						borderColor="green.700"
						p="3"
						textAlign="center"
						bg="green.100"
						borderRadius="15"
						cursor="pointer">
						<Heading size="lg">CATEGORY</Heading>
						<Divider my="2" />
						<Text>+x points</Text>
					</Box>
					<Box
						maxW="sm"
						border="2px"
						borderColor="green.700"
						p="3"
						textAlign="center"
						bg="green.100"
						borderRadius="15"
						cursor="pointer">
						<Heading size="lg">CATEGORY</Heading>
						<Divider my="2" />
						<Text>+x points</Text>
					</Box>
					<Box
						maxW="sm"
						border="2px"
						borderColor="green.700"
						p="3"
						textAlign="center"
						bg="green.100"
						borderRadius="15"
						cursor="pointer">
						<Heading size="lg">CATEGORY</Heading>
						<Divider my="2" />
						<Text>+x points</Text>
					</Box>
				</Flex>
			</Container>
		</>
	);
};

export default AppPage;
