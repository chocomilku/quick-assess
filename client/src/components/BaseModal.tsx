import { ReactNode } from "react";
import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	ThemingProps,
} from "@chakra-ui/react";

interface BaseModalProps {
	title: string;
	children: ReactNode;
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
	action?: {
		onClick: () => void;
		text: string;
		color: ThemingProps["colorScheme"];
	};
}

const BaseModal: React.FC<BaseModalProps> = (props) => {
	return (
		<Modal isOpen={props.isOpen} onClose={props.onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{props.title}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>{props.children}</ModalBody>
				<ModalFooter>
					<Button colorScheme="blue" mr={3} onClick={props.onClose}>
						Close
					</Button>
					{props.action && (
						<Button
							colorScheme={props.action.color}
							onClick={props.action.onClick}>
							{props.action.text}
						</Button>
					)}
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default BaseModal;
