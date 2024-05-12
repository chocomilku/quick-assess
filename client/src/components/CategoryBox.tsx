import { Heading, Divider, Box, Text, BackgroundProps } from "@chakra-ui/react";

interface CategoryBoxProps {
	categoryText: string;
	categoryPoints: number;
	categoryColor: BackgroundProps["bg"];
}

const CategoryBox: React.FC<CategoryBoxProps> = (props) => {
	return (
		<>
			<Box
				maxW="sm"
				border="2px"
				borderColor={`${props.categoryColor}.700`}
				p="3"
				textAlign="center"
				bg={`${props.categoryColor}.100`}
				borderRadius="15"
				cursor="pointer"
				transition="background 0.25s ease"
				flexGrow={1}
				flexShrink={1}
				_hover={{
					background: `${props.categoryColor}.200`,
				}}>
				<Heading size="lg">{props.categoryText.toUpperCase()}</Heading>
				<Divider my="2" />
				<Text>+{props.categoryPoints} points</Text>
			</Box>
		</>
	);
};

export default CategoryBox;
export type { CategoryBoxProps };
