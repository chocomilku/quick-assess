import React, { useState, useEffect } from "react";
import { Text } from "@chakra-ui/react";

const Clock: React.FC = () => {
	const [time, setTime] = useState(new Date().toLocaleTimeString());

	useEffect(() => {
		const timer = setInterval(() => {
			setTime(new Date().toLocaleTimeString());
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return <Text>Time: {time}</Text>;
};

export default Clock;
