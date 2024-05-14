import {
	Tooltip,
	IconButton,
	ThemingProps,
	UsePopperProps,
} from "@chakra-ui/react";

interface BaseIconButtonProps {
	onClick?: () => void;
	tooltipLabel: string;
	tooltipPlacement: UsePopperProps["placement"];
	ariaLabel: string;
	icon: JSX.Element;
	colorScheme: ThemingProps["colorScheme"];
}

const BaseIconButton: React.FC<BaseIconButtonProps> = (props) => {
	return (
		<Tooltip label={props.tooltipLabel} placement={props.tooltipPlacement}>
			<IconButton
				aria-label={props.ariaLabel}
				icon={props.icon}
				colorScheme={props.colorScheme}
				onClick={props.onClick}
			/>
		</Tooltip>
	);
};
export default BaseIconButton;
