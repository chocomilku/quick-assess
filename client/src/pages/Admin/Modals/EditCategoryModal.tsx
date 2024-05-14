import BaseModal from "@/components/BaseModal";
import { Input, Text, useToast } from "@chakra-ui/react";
import axiosInstance from "@/api/axiosInstance";
import { useFormValue } from "@/hooks/useFormValue";
import { Category } from "@/interfaces/API";
import { useEffect } from "react";

interface EditCategoryModalProps {
	onOpen: () => void;
	isOpen: boolean;
	onClose: () => void;
	data: Category;
}

interface EditCategoryFormValue extends Omit<Category, "id" | "gameId"> {}

const EditCategoryModal: React.FC<EditCategoryModalProps> = (props) => {
	const [formValue, handleFormValue] = useFormValue<EditCategoryFormValue>({
		text: props.data.text,
		points: props.data.points,
		color: props.data.color,
	});

	const toast = useToast();

	useEffect(() => {
		handleFormValue("text", props.data.text);
		handleFormValue("points", props.data.points);
		handleFormValue("color", props.data.color);
	}, [props.data.text, props.data.points, props.data.color]);

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

			const response = await axiosInstance.put<{ updated: number }>(
				`/category/${props.data.id}`,
				formValue
			);

			if (response.status === 200) {
				toast({
					title: "Success",
					description: `Category ${response.data.updated} has been added.`,
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
				title={`Editing Category ${props.data.id} for Game ${props.data.gameId}`}
				action={{
					onClick: handleSubmit,
					text: "Edit",
					color: "green",
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

export default EditCategoryModal;
