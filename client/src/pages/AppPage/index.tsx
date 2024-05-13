import { Divider, Heading, useToast } from "@chakra-ui/react";
import GameStatusBar from "./GameStatusBar";
import GamePage from "./GamePage";
import { useEffect, useState } from "react";
import { Category, Game, Question } from "@/interfaces/API";
import axiosInstance from "@/api/axiosInstance";

// TODO: fetch status then do conditionals to show a waiting page and the game page based on status

const AppPage: React.FC = () => {
	const toast = useToast();
	const [status, setStatus] = useState<Game>({
		name: "",
		id: -1,
		isRunning: 0,
	});
	const [availableCategories, setAvailableCategories] = useState<Category[]>(
		[]
	);
	const [questions, setQuestions] = useState<Question[]>([]);

	useEffect(() => {
		const fetchStatus = async () => {
			try {
				const response = await axiosInstance.get<Game[]>("/games", {
					params: {
						active: true,
					},
				});

				if (response.data.length <= 0) {
					setStatus({
						name: "",
						id: -1,
						isRunning: 0,
					});
				} else {
					setStatus(response.data[0]);
				}
			} catch (err) {
				toast({
					title: "Error",
					description: "An error occurred while fetching game status.",
					status: "error",
					duration: 9000,
					isClosable: true,
				});
				console.error(err);
			}
		};
		fetchStatus();
	}, []);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await axiosInstance.get<Category[]>(
					`/games/${status.id}/category`
				);

				setAvailableCategories(response.data);
			} catch (err) {
				toast({
					title: "Error",
					description: "An error occurred while fetching categories.",
					status: "error",
					duration: 9000,
					isClosable: true,
				});
				console.error(err);
			}
		};

		const fetchQuestions = async () => {
			try {
				const response = await axiosInstance.get<Question[]>(
					`/games/${status.id}/questions`
				);

				setQuestions(response.data);
			} catch (err) {
				toast({
					title: "Error",
					description: "An error occurred while fetching questions.",
					status: "error",
					duration: 9000,
					isClosable: true,
				});
				console.error(err);
			}
		};

		if (status.id !== -1) {
			fetchCategories();
			fetchQuestions();
		}
	}, [status.id]);

	return (
		<>
			<GameStatusBar isPlaying={Boolean(status.isRunning)} />
			<Divider />
			{status.isRunning === 0 || status.id === -1 ? (
				<>
					<Heading textAlign="center" my="4">
						No game is running.
					</Heading>
				</>
			) : (
				<GamePage
					categories={availableCategories}
					questions={questions}
					topic={status.name}
				/>
			)}
		</>
	);
};

export default AppPage;
