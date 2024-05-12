import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFound";
import AppPage from "./pages/AppPage";

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<AppPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
