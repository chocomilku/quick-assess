import { useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import { Game } from "@/interfaces/API";
import {
	Heading,
	useToast,
	Box,
	Text,
	Tag,
	Flex,
	IconButton,
	Tooltip,
} from "@chakra-ui/react";
import {
	BiCategory,
	BiQuestionMark,
	BiPlay,
	BiEdit,
	BiTrash,
} from "react-icons/bi";

const GamesPage: React.FC = () => {
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
						<Flex
							w="full"
							flexDirection="row"
							flexWrap="wrap"
							justifyContent="flex-start"
							alignItems="center">
							<Tag size="md" variant="subtle" colorScheme="green">
								GAME: {game.id}
							</Tag>
							<Text fontWeight="bold">&nbsp;{game.name}</Text>
						</Flex>
						<Flex
							w="full"
							gap="2"
							justifyContent="flex-end"
							alignItems="center">
							<Tooltip label="Categories" placement="top">
								<IconButton
									aria-label="Go to categories page"
									icon={<BiCategory />}
									colorScheme="purple"
								/>
							</Tooltip>

							<Tooltip label="Questions" placement="top">
								<IconButton
									aria-label="Go to questions page"
									icon={<BiQuestionMark />}
									colorScheme="orange"
								/>
							</Tooltip>

							<Tooltip label="Start/Stop the game" placement="top">
								<IconButton
									aria-label="Start/Stop the game"
									icon={<BiPlay />}
									colorScheme="green"
								/>
							</Tooltip>

							<Tooltip label="Edit game" placement="top">
								<IconButton
									aria-label="Edit the game"
									icon={<BiEdit />}
									colorScheme="blue"
								/>
							</Tooltip>

							<Tooltip
								label="Delete game (THIS WILL DELETE ITS CATEGORIES AND QUESTIONS)"
								placement="top">
								<IconButton
									aria-label="Delete the game"
									icon={<BiTrash />}
									colorScheme="red"
								/>
							</Tooltip>
						</Flex>
					</Flex>
				</Box>
			))}
		</>
	);
};

export default GamesPage;
