import BaseModal from "@/components/BaseModal";
import {
	Badge,
	Flex,
	Input,
	Radio,
	RadioGroup,
	Text,
	useToast,
} from "@chakra-ui/react";
import axiosInstance from "@/api/axiosInstance";
import { useFormValue } from "@/hooks/useFormValue";
import { useEffect, useState } from "react";
import { Category } from "@/interfaces/API";

interface AddQuestionModalProps {
	onOpen: () => void;
	isOpen: boolean;
	onClose: () => void;
	gameId: number;
}

interface AddQuestionFormValue {
	gameId: number;
	categoryId: number;
	question: string;
}
const AddQuestionModal: React.FC<AddQuestionModalProps> = (props) => {
	const [formValue, handleFormValue] = useFormValue<AddQuestionFormValue>({
		gameId: props.gameId,
		categoryId: -1,
		question: "",
	});

	const [availableCategories, setAvailableCategories] = useState<Category[]>(
		[]
	);

	useEffect(() => {
		axiosInstance
			.get<Category[]>(`/games/${props.gameId}/category`)
			.then((response) => {
				setAvailableCategories(response.data);
			})
			.catch((error) => {
				toast({
					title: "Error",
					description: "An error occurred while fetching categories.",
					status: "error",
					duration: 9000,
					isClosable: true,
				});
				console.error(error);
			});
	}, []);

	const toast = useToast();
	const validateForm = formValue.question != " && formValue.categoryId > 0";

	const handleSubmit = async () => {
		try {
			if (!validateForm)
				return toast({
					title: "Error",
					description: "Please fill in all fields.",
					status: "error",
					duration: 9000,
					isClosable: true,
				});

			const response = await axiosInstance.post<{ added: number }>(
				`/games/${formValue.gameId}/questions`,
				formValue
			);

			if (response.status === 201) {
				toast({
					title: "Success",
					description: `Question ${response.data.added} has been added.`,
					status: "success",
					duration: 9000,
					isClosable: true,
				});
			}

			props.onClose();
		} catch (error) {
			toast({
				title: "Error",
				description: "An error occurred while adding the question.",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
			console.error(error);
		}
	};

	return (
		<>
			<BaseModal
				isOpen={props.isOpen}
				onClose={props.onClose}
				onOpen={props.onOpen}
				title={`Add Question for Game ${formValue.gameId}`}
				action={{
					onClick: handleSubmit,
					text: "Add",
					color: "blue",
				}}>
				<Text>Question</Text>
				<Input
					value={formValue.question}
					onChange={(e) => handleFormValue("question", e.target.value)}
				/>
				<Text mt="2">Category</Text>
				<RadioGroup
					onChange={(e) => handleFormValue("categoryId", +e)}
					value={formValue.categoryId.toString()}>
					<Flex flexDirection="row" flexWrap="wrap" gap="2">
						{availableCategories.map((category) => (
							<Radio key={category.id} value={category.id.toString()}>
								<Badge colorScheme={category.color}>{category.text}</Badge>
							</Radio>
						))}
					</Flex>
				</RadioGroup>
			</BaseModal>
		</>
	);
};

export default AddQuestionModal;
