import BaseModal from "@/components/BaseModal";
import { Category } from "@/interfaces/API";
import { Highlight, useToast, Text } from "@chakra-ui/react";
import axiosInstance from "@/api/axiosInstance";

interface DeleteCategoryModalProps {
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
	data: Category;
}

const DeleteCategoryModal: React.FC<DeleteCategoryModalProps> = (props) => {
	const toast = useToast();

	const handleDelete = async () => {
		try {
			const response = await axiosInstance.delete(`/category/${props.data.id}`);

			if (response.status === 204) {
				toast({
					title: "Success",
					description: `Category ${props.data.id} has been deleted.`,
					status: "success",
					duration: 9000,
					isClosable: true,
				});
			}

			props.onClose();
		} catch (error) {
			toast({
				title: "Error",
				description: "An error occurred while deleting the category.",
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
				title={`Delete Game ${props.data.id}`}
				isOpen={props.isOpen}
				onClose={props.onClose}
				onOpen={props.onOpen}
				action={{
					onClick: handleDelete,
					text: "Delete",
					color: "red",
				}}>
				<Highlight
					query={`Category ${props.data.id} ${props.data.text}`}
					styles={{ px: "1", py: "1", bg: "red.100" }}>
					{`Are you sure you want to delete Category ${props.data.id.toString()} ${
						props.data.text
					}?`}
				</Highlight>
				<Text>
					<br />
					Every questions associated with this category will also be deleted.{" "}
					<strong>This action cannot be undone.</strong>
				</Text>
			</BaseModal>
		</>
	);
};

export default DeleteCategoryModal;
