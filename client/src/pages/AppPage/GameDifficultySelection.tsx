import { Flex, Text, useRadioGroup } from "@chakra-ui/react";
import CategoryBox, { CategoryBoxProps } from "../../components/CategoryBox";

interface GameDifficultySelectionProps {
	selection: CategoryBoxProps[];
}

const GameDifficultySelectionSubPage: React.FC<GameDifficultySelectionProps> = (
	props
) => {
	const { getRootProps, getRadioProps } = useRadioGroup({
		name: "category",
		onChange: console.log,
		// pass this to parent component with an onChange prop
		//TODO: add categoryId to interface
	});

	const group = getRootProps();
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
					const radio = getRadioProps({ value: category });
					return (
						<CategoryBox
							key={`category-box-${i}`}
							{...category}
							radioProps={radio}
						/>
					);
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
