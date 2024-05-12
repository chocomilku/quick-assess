import {
	Badge,
	Container,
	Divider,
	Flex,
	Heading,
	Highlight,
	Text,
} from "@chakra-ui/react";
import CategoryBox from "../../components/CategoryBox";

const AppPage: React.FC = () => {
	return (
		<>
			<Container maxW="container.lg" bg="gray.50" p="8" minH="100vh">
				<Text pb="4">
					STATUS: <Badge colorScheme="green">ONGOING</Badge>
				</Text>
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
					<CategoryBox
						categoryText="easy"
						categoryPoints={2}
						categoryColor="blue"
					/>
					<CategoryBox
						categoryText="Medium"
						categoryPoints={3}
						categoryColor="yellow"
					/>
					<CategoryBox
						categoryText="hard"
						categoryPoints={4}
						categoryColor="red"
					/>
				</Flex>
				<Text textAlign="center" fontStyle="italic" color="gray.400">
					If the answer is correct, user will get the stated points. If the
					answer is incorrect, user will get +1 point for participation
				</Text>
			</Container>
		</>
	);
};

export default AppPage;
