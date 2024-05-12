import {
	Badge,
	Container,
	Divider,
	Heading,
	Highlight,
	Text,
} from "@chakra-ui/react";
import GameDifficultySelectionSubPage from "./GameDifficultySelection";

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
				<GameDifficultySelectionSubPage
					selection={[
						{ categoryText: "easy", categoryPoints: 2, categoryColor: "blue" },
						{
							categoryText: "medium",
							categoryPoints: 3,
							categoryColor: "yellow",
						},
						{ categoryText: "hard", categoryPoints: 4, categoryColor: "red" },
					]}
				/>
			</Container>
		</>
	);
};

export default AppPage;
