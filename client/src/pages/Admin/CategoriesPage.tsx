import axiosInstance from "@/api/axiosInstance";
import { Category } from "@/interfaces/API";
import { Badge, Heading, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListItem from "@/components/ListItem";

const CategoriesPage: React.FC = () => {
	const { gameId } = useParams();

	const [categories, setCategories] = useState<Category[]>([]);
	const toast = useToast();

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

	return (
		<>
			<Heading my="4" textAlign="center">
				Game {gameId}/Categories
			</Heading>
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
						actions={[]}>
						<Badge colorScheme={category.color}>+{category.points}</Badge>
					</ListItem>
				);
			})}
		</>
	);
};

export default CategoriesPage;
