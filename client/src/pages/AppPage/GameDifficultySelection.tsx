import { Flex, Text } from "@chakra-ui/react";
import CategoryBox, { CategoryBoxProps } from "../../components/CategoryBox";

interface GameDifficultySelectionProps {
	selection: CategoryBoxProps[];
}

const GameDifficultySelectionSubPage: React.FC<GameDifficultySelectionProps> = (
	props
) => {
	return (
		<>
			<Flex
				gap="12"
				wrap="wrap"
				flexDirection="row"
				justifyContent="center"
				alignItems="center"
				p="4">
				{props.selection.map((category, i) => {
					return <CategoryBox key={`category-box-${i}`} {...category} />;
				})}
			</Flex>
			<Text textAlign="center" fontStyle="italic" color="gray.400">
				If the answer is correct, user will get the stated points. If the answer
				is incorrect, user will get +1 point for participation
			</Text>
		</>
	);
};

export default GameDifficultySelectionSubPage;
