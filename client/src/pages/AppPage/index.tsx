import { Divider, useToast } from "@chakra-ui/react";
import GameStatusBar from "./GameStatusBar";
import GamePage from "./GamePage";
import { useEffect, useState } from "react";
import { Game } from "@/interfaces/Game";
import axiosInstance from "@/api/axiosInstance";

// TODO: fetch status then do conditionals to show a waiting page and the game page based on status

const AppPage: React.FC = () => {
	const toast = useToast();
	const [status, setStatus] = useState<Game>({
		name: "",
		id: -1,
		isRunning: 0,
	});

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

	return (
		<>
			<GameStatusBar isPlaying={Boolean(status.isRunning)} />
			<Divider />
			<GamePage />
		</>
	);
};

export default AppPage;
