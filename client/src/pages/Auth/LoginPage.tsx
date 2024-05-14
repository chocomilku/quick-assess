import { useState } from "react";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	useToast,
} from "@chakra-ui/react";
import axiosInstance from "@/api/axiosInstance";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
	const [username, setusername] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();
	const toast = useToast();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const response = await axiosInstance.post(
				"/auth/login",
				{
					username,
					password,
				},
				{
					params: {
						response_format: "cookie",
					},
				}
			);

			if (response.status === 200) {
				toast({
					title: "Success",
					description: "Logged in successfully.",
					status: "success",
					duration: 9000,
					isClosable: true,
				});
				navigate("/games");
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				toast({
					title: "Error",
					description: error.response?.data.error ?? "An error occurred.",
					status: "error",
					duration: 9000,
					isClosable: true,
				});
			}
		}
	};

	return (
		<Box>
			<form onSubmit={handleSubmit}>
				<FormControl>
					<FormLabel>Username</FormLabel>
					<Input
						type="text"
						value={username}
						onChange={(e) => setusername(e.target.value)}
					/>
				</FormControl>

				<FormControl>
					<FormLabel>Password</FormLabel>
					<Input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</FormControl>

				<Button type="submit">Login</Button>
			</form>
		</Box>
	);
};

export default LoginPage;
