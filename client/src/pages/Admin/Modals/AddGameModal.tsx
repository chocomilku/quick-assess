import BaseModal from "@/components/BaseModal";
import { Input, Text, useToast } from "@chakra-ui/react";
import axiosInstance from "@/api/axiosInstance";
import { useFormValue } from "@/hooks/useFormValue";

interface AddGameModalProps {
	onOpen: () => void;
	isOpen: boolean;
	onClose: () => void;
}

interface AddGameFormValue {
	name: string;
}

const AddGameModal: React.FC<AddGameModalProps> = (props) => {
	const [formValue, handleFormValue] = useFormValue<AddGameFormValue>({
		name: "",
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

			const response = await axiosInstance.post<{ added: number }>(
				"/games",
				formValue
			);

			if (response.status === 201) {
				toast({
					title: "Success",
					description: `Game ${response.data.added} has been added.`,
					status: "success",
					duration: 9000,
					isClosable: true,
				});
			}

			props.onClose();
		} catch (error) {
			toast({
				title: "Error",
				description: "An error occurred while adding the game.",
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
				title="Add Game"
				action={{
					onClick: handleSubmit,
					text: "Add",
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

export default AddGameModal;
