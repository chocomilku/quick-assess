import { Flex, Text, useRadioGroup } from "@chakra-ui/react";
import CategoryBox, { CategoryBoxProps } from "../../components/CategoryBox";

interface GameDifficultySelectionProps {
	selection: CategoryBoxProps[];
	onChange: (selected: CategoryBoxProps) => void;
}

const GameDifficultySelectionSubPage: React.FC<GameDifficultySelectionProps> = (
	props
) => {
	const { getRadioProps } = useRadioGroup({
		name: "category",
		onChange: (value) => {
			const selectedCategory = props.selection.find(
				(category) => category.categoryId === Number(value)
			);
			if (selectedCategory) {
				props.onChange(selectedCategory);
			}
		},
	});

	return (
		<>
			<Flex
				gap="12"
				wrap="wrap"
				flexDirection="row"
				justifyContent="center"
				alignItems="center"
				p="4"
				w="full">
				{props.selection.map((category, i) => {
					const radio = getRadioProps({ value: category.categoryId });
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
