import {
	Heading,
	Divider,
	Box,
	Text,
	BackgroundProps,
	UseRadioProps,
	useRadio,
} from "@chakra-ui/react";

interface CategoryBoxProps {
	categoryId: number;
	categoryText: string;
	categoryPoints: number;
	categoryColor: BackgroundProps["bg"];
}

type CategoryBoxPropsAsRadio = CategoryBoxProps & { radioProps: UseRadioProps };

const CategoryBox: React.FC<CategoryBoxPropsAsRadio> = (props) => {
	const { getInputProps, getRadioProps } = useRadio(props.radioProps);

	const input = getInputProps();
	const radio = getRadioProps();

	return (
		<>
			<Box as="label" flexGrow={1} flexShrink={1}>
				<input {...input} />
				<Box
					{...radio}
					textColor={`${props.categoryColor}.800`}
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
			</Box>
		</>
	);
};

export default CategoryBox;
export type { CategoryBoxProps };
