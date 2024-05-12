import { Badge, Flex, Text } from "@chakra-ui/react";
import Clock from "../../components/Clock";

interface GameStatusBarProps {
	isPlaying: boolean;
}

const GameStatusBar: React.FC<GameStatusBarProps> = (props) => {
	return (
		<>
			<Flex flexDirection="row" justifyContent="space-between">
				<Text pb="4">
					STATUS:{" "}
					<Badge colorScheme={props.isPlaying ? "green" : "red"}>
						{props.isPlaying ? "ONGOING" : "NOT READY"}
					</Badge>
				</Text>
				<Clock />
			</Flex>
		</>
	);
};

export default GameStatusBar;
