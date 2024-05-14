import React, { ReactNode, useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import { Flex, Heading, Spinner } from "@chakra-ui/react";

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({
	children,
}: React.PropsWithChildren<{}>) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

	useEffect(() => {
		axiosInstance
			.get("/auth/status")
			.then((response) => {
				if (response.status === 200) {
					setIsAuthenticated(true);
				} else {
					setIsAuthenticated(false);
				}
			})
			.catch(() => {
				setIsAuthenticated(false);
			});
	}, []);

	if (isAuthenticated === null) {
		return (
			<>
				<Flex justifyContent="center" alignItems="center" h="100vh">
					<Spinner size="xl" />
				</Flex>
			</>
		);
	}

	return isAuthenticated ? (
		children
	) : (
		<>
			<Heading textAlign="center" my="4">
				Unauthorized. Please go back to the last page.
			</Heading>
		</>
	);
};

export default ProtectedRoute;
