import BaseModal from "@/components/BaseModal";
import { Input, Text, useToast } from "@chakra-ui/react";
import axiosInstance from "@/api/axiosInstance";
import { useFormValue } from "@/hooks/useFormValue";
import { Question } from "@/interfaces/API";
import { useEffect } from "react";

interface EditQuestionModalProps {
	onOpen: () => void;
	isOpen: boolean;
	onClose: () => void;
	data: Question;
}

interface EditQuestionFormValue {
	question: string;
}

const EditQuestionModal: React.FC<EditQuestionModalProps> = (props) => {
	const [formValue, handleFormValue] = useFormValue<EditQuestionFormValue>({
		question: props.data.question,
	});

	const toast = useToast();

	useEffect(() => {
		handleFormValue("question", props.data.question);
	}, [props.data.question]);

	const validateForm = formValue.question != "";

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

			const response = await axiosInstance.put<{ updated: number }>(
				`/questions/${props.data.id}`,
				formValue
			);

			if (response.status === 200) {
				toast({
					title: "Success",
					description: `Question ${response.data.updated} has been edited.`,
					status: "success",
					duration: 9000,
					isClosable: true,
				});
			}

			props.onClose();
		} catch (error) {
			toast({
				title: "Error",
				description: "An error occurred while editing the question.",
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
				title={`Editing Question ${props.data.id} for Game ${props.data.gameId}`}
				action={{
					onClick: handleSubmit,
					text: "Edit",
					color: "green",
				}}>
				<Text>Question</Text>
				<Input
					value={formValue.question}
					onChange={(e) => handleFormValue("question", e.target.value)}
				/>
			</BaseModal>
		</>
	);
};

export default EditQuestionModal;
