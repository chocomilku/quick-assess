import BaseModal from "@/components/BaseModal";
import { Input, Text, useToast } from "@chakra-ui/react";
import axiosInstance from "@/api/axiosInstance";
import { useFormValue } from "@/hooks/useFormValue";
import { Game } from "@/interfaces/API";

interface EditGameModalProps {
	onOpen: () => void;
	isOpen: boolean;
	onClose: () => void;
	data: Game;
}

interface EditGameFormValue extends Omit<Game, "id"> {}

const EditGameModal: React.FC<EditGameModalProps> = (props) => {
	const [formValue, handleFormValue] = useFormValue<
		Omit<EditGameFormValue, "isRunning">
	>({
		name: props.data.name,
	});
	const toast = useToast();

	const validateForm = formValue.name != "";

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
				`/games/${props.data.id}`,
				formValue
			);

			if (response.status === 200) {
				toast({
					title: "Success",
					description: `Game ${response.data.updated} has been edited.`,
					status: "success",
					duration: 9000,
					isClosable: true,
				});
			}

			props.onClose();
		} catch (error) {
			toast({
				title: "Error",
				description: "An error occurred while editing the game.",
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
				onOpen={props.onOpen}
				onClose={props.onClose}
				title={`Editing Game ${props.data.id}`}
				action={{
					onClick: handleSubmit,
					text: "Edit",
					color: "green",
				}}>
				<Text>Game Name:</Text>
				<Input
					type="text"
					onChange={(e) => handleFormValue("name", e.target.value)}
					value={formValue.name}
				/>
			</BaseModal>
		</>
	);
};

export default EditGameModal;
