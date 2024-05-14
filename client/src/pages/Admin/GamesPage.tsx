import { useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import { Game } from "@/interfaces/API";
import {
	Heading,
	useToast,
	Text,
	Tag,
	Flex,
	IconButton,
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
import ListItem from "@/components/ListItem";
import BaseIconButton from "@/components/IconButtons/BaseIconButton";

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

	const [selectedGameEdit, setSelectedGameEdit] = useState<Game>({
		id: -1,
		name: "",
		isRunning: 0,
	});

	const handleEditModalOpen = (gameId: number) => {
		const findGame = games.find((game) => game.id === gameId);
		if (!findGame) return;
		setSelectedGameEdit(findGame);
		editGameModalControls.onOpen();
	};

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
			<EditGameModal
				isOpen={editGameModalControls.isOpen}
				onClose={editGameModalControls.onClose}
				onOpen={editGameModalControls.onOpen}
				data={selectedGameEdit}
			/>

			{games.map((game, index) => {
				return (
					<>
						<ListItem key={index}>
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
									<BaseIconButton
										ariaLabel="Go to categories page"
										colorScheme="purple"
										icon={<BiCategory />}
										tooltipLabel="Categories"
										tooltipPlacement="top"
									/>

									<BaseIconButton
										ariaLabel="Go to questions page"
										colorScheme="pink"
										icon={<BiQuestionMark />}
										tooltipLabel="Questions"
										tooltipPlacement="top"
									/>

									<BaseIconButton
										ariaLabel="Start/Stop the game"
										colorScheme={game.isRunning ? "orange" : "green"}
										icon={game.isRunning ? <BiStop /> : <BiPlay />}
										tooltipLabel="Start/Stop the game"
										tooltipPlacement="top"
										onClick={() => handleToggleGameState(game.id)}
									/>

									<BaseIconButton
										ariaLabel="Edit the game"
										colorScheme="blue"
										icon={<BiEdit />}
										tooltipLabel="Edit game"
										tooltipPlacement="top"
										onClick={() => handleEditModalOpen(game.id)}
									/>

									<BaseIconButton
										ariaLabel="Delete the game"
										colorScheme="red"
										icon={<BiTrash />}
										tooltipLabel="Delete game (THIS WILL DELETE ITS CATEGORIES AND QUESTIONS)"
										tooltipPlacement="top"
									/>
								</Flex>
							</Flex>
						</ListItem>
					</>
				);
			})}
		</>
	);
};

export default GamesPage;
