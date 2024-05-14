import { Box, Flex, Tag, Text, ThemingProps } from "@chakra-ui/react";

interface ListItemProps {
	children?: React.ReactNode;
	identifier: {
		label: string;
		value: string;
		colorScheme: ThemingProps["colorScheme"];
	};
	text: string;
	actions: JSX.Element[];
}

const ListItem: React.FC<ListItemProps> = (props) => {
	return (
		<>
			<Box border="1px" borderColor="gray.200" borderRadius="md" p="4" my="2">
				<Flex>
					<Flex
						w="full"
						flexDirection="row"
						flexWrap="wrap"
						justifyContent="flex-start"
						alignItems="center">
						<Tag
							size="md"
							variant="subtle"
							colorScheme={props.identifier.colorScheme}>
							{props.identifier.label.toUpperCase()}: {props.identifier.value}
						</Tag>
						<Text fontWeight="bold">&nbsp;{props.text}</Text>
						&nbsp;{props.children}
					</Flex>
					<Flex w="full" gap="2" justifyContent="flex-end" alignItems="center">
						{props.actions}
					</Flex>
				</Flex>
			</Box>
		</>
	);
};

export default ListItem;
