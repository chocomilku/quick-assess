import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Container, useColorModeValue } from "@chakra-ui/react";
import NotFoundPage from "@/pages/NotFound";
import AppPage from "@/pages/AppPage";
import GamesPage from "@/pages/Admin/GamesPage";
import CategoriesPage from "@/pages/Admin/CategoriesPage";
import LogsPage from "@/pages/Logs";
import ProtectedRoute from "@/components/ProtectedRoute";
import LoginPage from "@/pages/Auth/LoginPage";
import QuestionsPage from "./pages/Admin/QuestionsPage";
import AnswersPage from "./pages/Admin/AnswersPage";

function App() {
	const bg = useColorModeValue("gray.50", "gray.800");

	return (
		<>
			<Container maxW="container.lg" bg={bg} p="8" minH="100vh">
				<Router>
					<Routes>
						<Route path="/" element={<AppPage />} />
						<Route
							path="/games"
							element={
								<ProtectedRoute>
									<GamesPage />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/games/:gameId/categories"
							element={
								<ProtectedRoute>
									<CategoriesPage />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/games/:gameId/questions"
							element={
								<ProtectedRoute>
									<QuestionsPage />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/questions/:questionId/answers"
							element={
								<ProtectedRoute>
									<AnswersPage />
								</ProtectedRoute>
							}
						/>
						<Route path="/logs" element={<LogsPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</Router>
			</Container>
		</>
	);
}

export default App;
