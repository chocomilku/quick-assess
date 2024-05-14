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
	useDisclosure,
} from "@chakra-ui/react";
import {
	BiCategory,
	BiQuestionMark,
	BiPlay,
	BiEdit,
	BiTrash,
	BiStop,
	BiPlus,
} from "react-icons/bi";
import AddGameModal from "./Modals/AddGameModal";
import EditGameModal from "./Modals/EditGameModal";

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

	const handleToggleGameState = (gameId: number) => {
		axiosInstance
			.patch<{ updated: number; isRunning: boolean }>(`/games/${gameId}`, {
				isRunning: !Boolean(
					games.find((game) => game.id === gameId)?.isRunning
				),
			})
			.then((response) => {
				toast({
					title: "Success",
					description: `Game state changed to ${response.data.isRunning}.`,
					status: "success",
					duration: 9000,
					isClosable: true,
				});
				setGames(
					games.map((game) => {
						if (game.id === gameId) {
							return {
								...game,
								isRunning: Number(!game.isRunning),
							};
						}
						return game;
					})
				);
			})
			.catch((error) => {
				toast({
					title: "Error",
					description: `An error occurred while toggling game state. ${error.response?.data.error}`,
					status: "error",
					duration: 9000,
					isClosable: true,
				});
				console.error(error);
			});
	};

	const addGameModalControls = useDisclosure();
	const editGameModalControls = useDisclosure();

	return (
		<>
			<Heading my="4" textAlign="center">
				Games{" "}
				<IconButton
					aria-label="Add game"
					icon={<BiPlus />}
					size="sm"
					onClick={addGameModalControls.onOpen}
				/>
				<AddGameModal
					isOpen={addGameModalControls.isOpen}
					onClose={addGameModalControls.onClose}
					onOpen={addGameModalControls.onOpen}
				/>
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
									colorScheme="pink"
								/>
							</Tooltip>

							<Tooltip label="Start/Stop the game" placement="top">
								<IconButton
									aria-label="Start/Stop the game"
									icon={game.isRunning ? <BiStop /> : <BiPlay />}
									colorScheme={game.isRunning ? "orange" : "green"}
									onClick={() => handleToggleGameState(game.id)}
								/>
							</Tooltip>

							<Tooltip label="Edit game" placement="top">
								<IconButton
									aria-label="Edit the game"
									icon={<BiEdit />}
									colorScheme="blue"
									onClick={editGameModalControls.onOpen}
								/>
							</Tooltip>
							<EditGameModal
								isOpen={editGameModalControls.isOpen}
								onClose={editGameModalControls.onClose}
								onOpen={editGameModalControls.onOpen}
								data={game}
							/>

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
