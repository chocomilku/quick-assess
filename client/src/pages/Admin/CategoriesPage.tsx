import axiosInstance from "@/api/axiosInstance";
import { Category } from "@/interfaces/API";
import {
	Badge,
	Heading,
	IconButton,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ListItem from "@/components/ListItem";
import BaseIconButton from "@/components/IconButtons/BaseIconButton";
import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import AddCategoryModal from "./Modals/AddCategoryModal";
import EditCategoryModal from "./Modals/EditCategoryModal";
import DeleteCategoryModal from "./Modals/DeleteCategoryModal";

const CategoriesPage: React.FC = () => {
	const { gameId } = useParams();

	const [categories, setCategories] = useState<Category[]>([]);
	const toast = useToast();
	const navigate = useNavigate();

	if (!gameId) {
		navigate("/games");
		return;
	}

	useEffect(() => {
		axiosInstance
			.get<Category[]>(`/games/${gameId}/category`)
			.then((response) => {
				setCategories(response.data);
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

	const addCategoryModalControls = useDisclosure();
	const editCategoryModalControls = useDisclosure();
	const deleteCategoryModalControls = useDisclosure();

	const [selectedCategoryModify, setSelectedCategoryModify] =
		useState<Category>({
			id: -1,
			gameId: +gameId,
			text: "",
			points: 0,
			color: "",
		});

	const handleModifyCategory = (
		categoryId: number,
		action: "edit" | "delete"
	) => {
		// reset first before doing anything
		setSelectedCategoryModify({
			id: -1,
			gameId: +gameId,
			text: "",
			points: 0,
			color: "",
		});
		const findCategory = categories.find(
			(category) => category.id === categoryId
		);
		if (!findCategory) return;
		setSelectedCategoryModify(findCategory);
		if (action === "edit") {
			editCategoryModalControls.onOpen();
		} else if (action === "delete") {
			deleteCategoryModalControls.onOpen();
		}
	};

	return (
		<>
			<Heading my="4" textAlign="center">
				Game {gameId}/Categories&nbsp;
				<IconButton
					aria-label="Add game"
					icon={<BiPlus />}
					size="sm"
					onClick={addCategoryModalControls.onOpen}
				/>
				<AddCategoryModal gameId={+gameId} {...addCategoryModalControls} />
			</Heading>
			<EditCategoryModal
				data={selectedCategoryModify}
				{...editCategoryModalControls}
			/>
			<DeleteCategoryModal
				data={selectedCategoryModify}
				{...deleteCategoryModalControls}
			/>
			{categories.map((category, index) => {
				return (
					<ListItem
						key={index}
						identifier={{
							label: "Category",
							value: category.id.toString(),
							colorScheme: "blue",
						}}
						text={category.text}
						actions={[
							<BaseIconButton
								ariaLabel="Edit the category"
								colorScheme="blue"
								icon={<BiEdit />}
								tooltipLabel="Edit category"
								tooltipPlacement="top"
								onClick={() => handleModifyCategory(category.id, "edit")}
							/>,
							<BaseIconButton
								ariaLabel="Delete the category"
								colorScheme="red"
								icon={<BiTrash />}
								tooltipLabel="Delete game (THIS WILL DELETE ITS QUESTIONS)"
								tooltipPlacement="top"
								onClick={() => handleModifyCategory(category.id, "delete")}
							/>,
						]}>
						<Badge colorScheme={category.color}>+{category.points}</Badge>
					</ListItem>
				);
			})}
		</>
	);
};

export default CategoriesPage;
