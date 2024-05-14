import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFound";
import AppPage from "./pages/AppPage";
import AdminPage from "./pages/Admin";
import LogsPage from "./pages/Logs";
import { Container, useColorModeValue } from "@chakra-ui/react";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
	const bg = useColorModeValue("gray.50", "gray.800");

	return (
		<>
			<Container maxW="container.lg" bg={bg} p="8" minH="100vh">
				<Router>
					<Routes>
						<Route path="/" element={<AppPage />} />
						<Route
							path="/admin"
							element={
								<ProtectedRoute>
									<AdminPage />
								</ProtectedRoute>
							}
						/>
						<Route path="/logs" element={<LogsPage />} />
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</Router>
			</Container>
		</>
	);
}

export default App;
