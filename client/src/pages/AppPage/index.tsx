import {
	Badge,
	Button,
	Container,
	Divider,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	Heading,
	Highlight,
	Input,
	Text,
	Textarea,
	VStack,
} from "@chakra-ui/react";
import GameDifficultySelectionSubPage from "./GameDifficultySelection";
import Clock from "../../components/Clock";
import { CategoryBoxProps } from "../../components/CategoryBox";
import { useState } from "react";

interface FormValue {
	name: string;
	answer: string;
}

const AppPage: React.FC = () => {
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

	const handleSubmit = () => {
		alert(`name: ${formValue.name}, answer: ${formValue.answer}`);
		setFormValue({
			name: "",
			answer: "",
		});
		setSelectedCategory(null);
	};

	return (
		<>
			<Container maxW="container.lg" bg="gray.50" p="8" minH="100vh">
				<Flex flexDirection="row" justifyContent="space-between">
					<Text pb="4">
						STATUS: <Badge colorScheme="green">ONGOING</Badge>
					</Text>
					<Clock />
				</Flex>
				<Divider />
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
							<Button
								colorScheme="green"
								variant="outline"
								size="lg"
								onClick={handleSubmit}>
								Submit
							</Button>
						</VStack>
					</>
				)}
			</Container>
		</>
	);
};

export default AppPage;
