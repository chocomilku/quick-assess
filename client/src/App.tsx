import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFound";
import AppPage from "./pages/AppPage";
import { Container, useColorModeValue } from "@chakra-ui/react";

function App() {
	const bg = useColorModeValue("gray.50", "gray.800");

	return (
		<>
			<Container maxW="container.lg" bg={bg} p="8" minH="100vh">
				<Router>
					<Routes>
						<Route path="/" element={<AppPage />} />
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</Router>
			</Container>
		</>
	);
}

export default App;
