import {
	Badge,
	Button,
	Divider,
	FormControl,
	FormHelperText,
	FormLabel,
	Heading,
	Highlight,
	Input,
	Textarea,
	Tooltip,
	VStack,
} from "@chakra-ui/react";
import GameDifficultySelectionSubPage from "./GameDifficultySelection";
import { CategoryBoxProps } from "../../components/CategoryBox";
import { useMemo, useState } from "react";

interface FormValue {
	name: string;
	answer: string;
}

const GamePage: React.FC = () => {
	const [selectedCategory, setSelectedCategory] =
		useState<CategoryBoxProps | null>(null);
	const [formValue, setFormValue] = useState<FormValue>({
		name: "",
		answer: "",
	});

	const handleCategoryChange = (selected: CategoryBoxProps) => {
		setSelectedCategory(selected);
	};

	const handleFormChange = <K extends keyof FormValue>(
		property: K,
		newValue: FormValue[K]
	) => {
		setFormValue((prevState) => ({ ...prevState, [property]: newValue }));
	};

	const validateForm = useMemo(() => {
		return formValue.name != "" && formValue.answer != "";
	}, [formValue]);

	const handleSubmit = () => {
		if (!validateForm) return;
		alert(`name: ${formValue.name}, answer: ${formValue.answer}`);
		setFormValue({
			name: "",
			answer: "",
		});
		setSelectedCategory(null);
	};

	return (
		<>
			{selectedCategory == null ? (
				<>
					<Heading m="8" textAlign="center">
						<Highlight
							query="Topic:"
							styles={{ p: "1", bg: "green.100", rounded: "6" }}>
							Topic: Something
						</Highlight>
					</Heading>
					<Divider />
					<GameDifficultySelectionSubPage
						onChange={handleCategoryChange}
						selection={[
							{
								categoryId: 1,
								categoryText: "easy",
								categoryPoints: 2,
								categoryColor: "blue",
							},
							{
								categoryId: 2,
								categoryText: "medium",
								categoryPoints: 3,
								categoryColor: "yellow",
							},
							{
								categoryId: 3,
								categoryText: "hard",
								categoryPoints: 4,
								categoryColor: "purple",
							},
						]}
					/>
				</>
			) : (
				<>
					<Heading m="8" textAlign="center">
						<Highlight
							query="Question:"
							styles={{ p: "1", bg: "green.100", rounded: "6" }}>
							Question: Something about monkeys
						</Highlight>
						<Badge
							mx="2"
							colorScheme={selectedCategory.categoryColor?.toString()}>
							{selectedCategory.categoryText}
						</Badge>
					</Heading>
					<Divider />
					<VStack>
						<FormControl my={2} px={{ base: "2", md: "8" }} isRequired>
							<FormLabel>Name</FormLabel>
							<Input
								value={formValue.name}
								onChange={(e) => handleFormChange("name", e.target.value)}
							/>
							<FormHelperText>Please type your last name.</FormHelperText>
						</FormControl>

						<FormControl my={2} px={{ base: "2", md: "8" }} isRequired>
							<FormLabel>Answer</FormLabel>
							<Textarea
								value={formValue.answer}
								onChange={(e) => handleFormChange("answer", e.target.value)}
							/>
						</FormControl>
						<Tooltip
							label="Make sure that every required form is filled up."
							placement="top"
							isDisabled={validateForm}>
							<Button
								colorScheme="green"
								variant="outline"
								size="lg"
								onClick={handleSubmit}
								isDisabled={!validateForm}>
								Submit
							</Button>
						</Tooltip>
					</VStack>
				</>
			)}
		</>
	);
};

export default GamePage;
