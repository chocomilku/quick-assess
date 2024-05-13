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
	useToast,
} from "@chakra-ui/react";
import GameDifficultySelectionSubPage from "./GameDifficultySelection";
import { CategoryBoxProps } from "../../components/CategoryBox";
import { useMemo, useState } from "react";
import { Category, Question } from "@/interfaces/API";
import axiosInstance from "@/api/axiosInstance";

interface FormValue {
	name: string;
	answer: string;
}

interface GamePageProps {
	topic: string;
	categories: Category[];
	questions: Question[];
}

const GamePage: React.FC<GamePageProps> = (props) => {
	const toast = useToast();
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

	const selectedQuestion = useMemo(() => {
		if (selectedCategory == null) return null;
		const question = props.questions.find(
			(question) => question.categoryId === selectedCategory.categoryId
		);
		return question;
	}, [selectedCategory, props.questions]);

	const handleSubmit = async () => {
		if (!validateForm) return;

		const response = await axiosInstance.post(
			`/questions/${selectedQuestion?.id}/answer`,
			{
				author: formValue.name,
				answer: formValue.answer,
			}
		);

		if (response.status === 201) {
			toast({
				title: "Success",
				description: "Your answer has been submitted.",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Error",
				description: "An error occurred while submitting your answer.",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}

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
							{`Topic: ${props.topic}`}
						</Highlight>
					</Heading>
					<Divider />
					<GameDifficultySelectionSubPage
						onChange={handleCategoryChange}
						selection={props.categories.map((category) => {
							return {
								categoryId: category.id,
								categoryText: category.text,
								categoryPoints: category.points,
								categoryColor: category.color,
							};
						})}
					/>
				</>
			) : (
				<>
					<Heading m="8" textAlign="center">
						<Highlight
							query="Question:"
							styles={{ p: "1", bg: "green.100", rounded: "6" }}>
							{`Question: ${selectedQuestion?.question}`}
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
