import BaseModal from "@/components/BaseModal";
import { Input, Text, useToast } from "@chakra-ui/react";
import axiosInstance from "@/api/axiosInstance";
import { useFormValue } from "@/hooks/useFormValue";

interface AddCategoryModalProps {
	onOpen: () => void;
	isOpen: boolean;
	onClose: () => void;
	gameId: number;
}

interface AddCategoryFormValue {
	gameId: number;
	text: string;
	points: number;
	color: string;
}
const AddCategoryModal: React.FC<AddCategoryModalProps> = (props) => {
	const [formValue, handleFormValue] = useFormValue<AddCategoryFormValue>({
		gameId: props.gameId,
		text: "",
		points: 0,
		color: "",
	});

	const toast = useToast();
	const validateForm =
		formValue.text != "" && formValue.points >= 0 && formValue.color != "";

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
				`/games/${formValue.gameId}/category`,
				formValue
			);

			if (response.status === 201) {
				toast({
					title: "Success",
					description: `Category ${response.data.added} has been added.`,
					status: "success",
					duration: 9000,
					isClosable: true,
				});
			}

			props.onClose();
		} catch (error) {
			toast({
				title: "Error",
				description: "An error occurred while adding the category.",
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
				title={`Add Category for Game ${formValue.gameId}`}
				action={{
					onClick: handleSubmit,
					text: "Add",
					color: "blue",
				}}>
				<Text mb="2">Text:</Text>
				<Input
					value={formValue.text}
					onChange={(e) => handleFormValue("text", e.target.value)}
				/>
				<Text mb="2">Points</Text>
				<Input
					value={formValue.points}
					type="number"
					onChange={(e) => handleFormValue("points", +e.target.value)}
				/>
				<Text mb="2">Color</Text>
				<Input
					value={formValue.color}
					onChange={(e) => handleFormValue("color", e.target.value)}
				/>
			</BaseModal>
		</>
	);
};

export default AddCategoryModal;
