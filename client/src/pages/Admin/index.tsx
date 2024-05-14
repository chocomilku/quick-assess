import axiosInstance from "@/api/axiosInstance";
import { Game } from "@/interfaces/API";
import { Heading, useToast, Box, Text, Tag, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const AdminPage: React.FC = () => {
	const [games, setGames] = useState<Game[]>([]);
	const toast = useToast();

	useEffect(() => {
		axiosInstance
			.get<Game[]>("/games")
			.then((response) => {
				setGames(response.data);
			})
			.catch((error) => {
				toast({
					title: "Error",
					description: "An error occurred while fetching games.",
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
				Games
			</Heading>
			{games.map((game, index) => (
				<Box
					key={index}
					border="1px"
					borderColor="gray.200"
					borderRadius="md"
					p="4"
					my="2">
					<Flex>
						<Flex w="full">
							<Tag size="md" variant="subtle" colorScheme="green">
								GAME: {game.id}
							</Tag>
							<Text fontWeight="bold">&nbsp;{game.name}</Text>
						</Flex>
						<Box w="full">a</Box>
					</Flex>
				</Box>
			))}
		</>
	);
};

export default AdminPage;
