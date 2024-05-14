import { Box } from "@chakra-ui/react";

const ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<>
			<Box border="1px" borderColor="gray.200" borderRadius="md" p="4" my="2">
				{children}
			</Box>
		</>
	);
};

export default ListItem;
