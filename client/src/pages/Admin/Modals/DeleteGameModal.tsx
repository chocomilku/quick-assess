import BaseModal from "@/components/BaseModal";
import { Game } from "@/interfaces/API";
import { Highlight, useToast, Text } from "@chakra-ui/react";
import axiosInstance from "@/api/axiosInstance";

interface DeleteGameModalProps {
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
	data: Game;
}

const DeleteGameModal: React.FC<DeleteGameModalProps> = (props) => {
	const toast = useToast();

	const handleDelete = async () => {
		try {
			const response = await axiosInstance.delete(`/games/${props.data.id}`);

			if (response.status === 204) {
				toast({
					title: "Success",
					description: `Game ${props.data.id} has been deleted.`,
					status: "success",
					duration: 9000,
					isClosable: true,
				});
			}

			props.onClose();
		} catch (error) {
			toast({
				title: "Error",
				description: "An error occurred while deleting the game.",
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
					query={`Game ${props.data.id} ${props.data.name}`}
					styles={{ px: "1", py: "1", bg: "red.100" }}>
					{`Are you sure you want to delete Game ${props.data.id.toString()} ${
						props.data.name
					}?`}
				</Highlight>
				<Text>
					<br />
					Every categories and questions associated with this game will also be
					deleted. <strong>This action cannot be undone.</strong>
				</Text>
			</BaseModal>
		</>
	);
};

export default DeleteGameModal;
