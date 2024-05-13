import { Divider } from "@chakra-ui/react";
import GameStatusBar from "./GameStatusBar";
import GamePage from "./GamePage";

// TODO: fetch status then do conditionals to show a waiting page and the game page based on status

const AppPage: React.FC = () => {
	return (
		<>
			<GameStatusBar isPlaying={true} />
			<Divider />
			<GamePage />
		</>
	);
};

export default AppPage;
