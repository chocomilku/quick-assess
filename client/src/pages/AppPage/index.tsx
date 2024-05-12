import { Container, Divider } from "@chakra-ui/react";
import GameStatusBar from "./GameStatusBar";
import GamePage from "./GamePage";

// TODO: fetch status then do conditionals to show a waiting page and the game page based on status

const AppPage: React.FC = () => {
	return (
		<>
			<Container maxW="container.lg" bg="gray.50" p="8" minH="100vh">
				<GameStatusBar isPlaying={true} />
				<Divider />
				<GamePage />
			</Container>
		</>
	);
};

export default AppPage;
