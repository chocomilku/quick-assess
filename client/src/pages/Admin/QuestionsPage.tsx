import axiosInstance from "@/api/axiosInstance";
import BaseIconButton from "@/components/IconButtons/BaseIconButton";
import ListItem from "@/components/ListItem";
import { Category, Question } from "@/interfaces/API";
import {
	Badge,
	Heading,
	IconButton,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiEdit, BiTrash, BiCommentEdit, BiPlus } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import AddQuestionModal from "./Modals/AddQuestionModal";
import EditQuestionModal from "./Modals/EditQuestionModal";
import DeleteQuestionModal from "./Modals/DeleteQuestionModal";

const QuestionsPage: React.FC = () => {
	const { gameId } = useParams();

	type QuestionCategoryJoined = Question & Category;

	const [questions, setQuestions] = useState<QuestionCategoryJoined[]>([]);
	const toast = useToast();
	const navigate = useNavigate();

	if (!gameId) {
		navigate("/games");
		return;
	}

	useEffect(() => {
		axiosInstance
			.get<QuestionCategoryJoined[]>(`/games/${gameId}/questions`)
			.then((response) => {
				console.log(response.data);
				setQuestions(response.data);
			})
			.catch((error) => {
				toast({
					title: "Error",
					description: "An error occurred while fetching questions.",
					status: "error",
					duration: 9000,
					isClosable: true,
				});
				console.error(error);
			});
	}, []);

	const addQuestionModalControls = useDisclosure();
	const editQuestionModalControls = useDisclosure();
	const deleteQuestionModalControls = useDisclosure();

	const [selectedQuestionModify, setSelectedQuestionModify] =
		useState<Question>({
			id: -1,
			gameId: +gameId,
			categoryId: -1,
			question: "",
		});

	const handleModifyQuestion = (
		questionId: number,
		action: "edit" | "delete"
	) => {
		setSelectedQuestionModify({
			id: -1,
			gameId: +gameId,
			categoryId: -1,
			question: "",
		});
		const findQuestion = questions.find(
			(question) => question.id === questionId
		);

		if (!findQuestion) return;
		setSelectedQuestionModify(findQuestion);

		if (action === "edit") {
			editQuestionModalControls.onOpen();
		} else if (action === "delete") {
			deleteQuestionModalControls.onOpen();
		}
	};

	const handleNavigateToAnswers = (questionId: number) => {
		navigate(`/questions/${questionId}/answers`);
	};

	return (
		<>
			<Heading my="4" textAlign="center">
				Game {gameId}/Questions&nbsp;
				<IconButton
					aria-label="Add question"
					icon={<BiPlus />}
					size="sm"
					onClick={addQuestionModalControls.onOpen}
				/>
				<AddQuestionModal gameId={+gameId} {...addQuestionModalControls} />
				<EditQuestionModal
					data={selectedQuestionModify}
					{...editQuestionModalControls}
				/>
				<DeleteQuestionModal
					data={selectedQuestionModify}
					{...deleteQuestionModalControls}
				/>
			</Heading>
			{questions.map((question, index) => {
				return (
					<ListItem
						key={index}
						identifier={{
							label: "Question",
							value: question.id.toString(),
							colorScheme: "pink",
						}}
						text={question.question}
						actions={[
							<BaseIconButton
								ariaLabel="Check answers"
								colorScheme="yellow"
								icon={<BiCommentEdit />}
								tooltipLabel="Check answers"
								tooltipPlacement="top"
								onClick={() => handleNavigateToAnswers(question.id)}
							/>,
							<BaseIconButton
								ariaLabel="Edit the question"
								colorScheme="blue"
								icon={<BiEdit />}
								tooltipLabel="Edit question"
								tooltipPlacement="top"
								onClick={() => handleModifyQuestion(question.id, "edit")}
							/>,
							<BaseIconButton
								ariaLabel="Delete the question"
								colorScheme="red"
								icon={<BiTrash />}
								tooltipLabel="Delete question"
								tooltipPlacement="top"
								onClick={() => handleModifyQuestion(question.id, "delete")}
							/>,
						]}>
						<Badge colorScheme={question.color}>{question.text}</Badge>
					</ListItem>
				);
			})}
		</>
	);
};

export default QuestionsPage;
