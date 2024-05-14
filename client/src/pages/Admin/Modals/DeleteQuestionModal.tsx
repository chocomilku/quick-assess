import BaseModal from "@/components/BaseModal";
import { Question } from "@/interfaces/API";
import { Highlight, useToast, Text } from "@chakra-ui/react";
import axiosInstance from "@/api/axiosInstance";

interface DeleteQuestionModalProps {
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
	data: Question;
}

const DeleteQuestionModal: React.FC<DeleteQuestionModalProps> = (props) => {
	const toast = useToast();

	const handleDelete = async () => {
		try {
			const response = await axiosInstance.delete(
				`/questions/${props.data.id}`
			);

			if (response.status === 204) {
				toast({
					title: "Success",
					description: `Question ${props.data.id} has been deleted.`,
					status: "success",
					duration: 9000,
					isClosable: true,
				});
			}

			props.onClose();
		} catch (error) {
			toast({
				title: "Error",
				description: "An error occurred while deleting the question.",
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
				title={`Delete Question ${props.data.id}`}
				isOpen={props.isOpen}
				onClose={props.onClose}
				onOpen={props.onOpen}
				action={{
					onClick: handleDelete,
					text: "Delete",
					color: "red",
				}}>
				<Highlight
					query={`Question ${props.data.id} ${props.data.question}`}
					styles={{ px: "1", py: "1", bg: "red.100" }}>
					{`Are you sure you want to delete Question ${props.data.id.toString()} ${
						props.data.question
					}?`}
				</Highlight>
				<Text>
					<br />
					<strong>This action cannot be undone.</strong>
				</Text>
			</BaseModal>
		</>
	);
};

export default DeleteQuestionModal;
