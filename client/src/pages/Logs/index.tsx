import React, { useEffect, useState } from "react";
import { Logs } from "@/interfaces/API";
import axiosInstance from "@/api/axiosInstance";
import { Heading, Text, Box } from "@chakra-ui/react";

const LogsPage: React.FC = () => {
	const [logs, setLogs] = useState<Logs[]>([]);

	useEffect(() => {
		const interval = setInterval(() => {
			axiosInstance
				.get<Logs[]>("/logs")
				.then((response) => {
					setLogs(response.data);
				})
				.catch((error) => {
					console.error(error);
				});
		}, 10000); // Fetch every 10 seconds

		return () => clearInterval(interval); // Clean up on component unmount
	}, [logs]);

	return (
		<>
			<Heading my="4" textAlign="center">
				Logs
			</Heading>
			{logs.map((log, index) => (
				<Box
					key={index}
					border="1px"
					borderColor="gray.200"
					borderRadius="md"
					p="4"
					my="2">
					<Text fontWeight="bold">{log.action}</Text>
					<Text mt="2">{log.timestamp}</Text>
				</Box>
			))}
		</>
	);
};

export default LogsPage;
