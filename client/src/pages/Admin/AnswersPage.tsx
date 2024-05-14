import axiosInstance from "@/api/axiosInstance";
import BaseIconButton from "@/components/IconButtons/BaseIconButton";
import ListItem from "@/components/ListItem";
import { Answer, Category, Question } from "@/interfaces/API";
import { Heading, useToast, Text, Badge } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiCheck, BiX } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";

const AnswersPage: React.FC = () => {
	const { questionId } = useParams();

	type QuestionCategoryJoined = Question & Category;

	const [answers, setAnswers] = useState<Answer[]>([]);
	const [question, setQuestion] = useState<QuestionCategoryJoined>();
	const toast = useToast();
	const navigate = useNavigate();

	if (!questionId) {
		navigate("/games");
		return;
	}

	useEffect(() => {
		axiosInstance
			.get<QuestionCategoryJoined[]>(`/questions/${questionId}`)
			.then((response) => {
				setQuestion(response.data[0]);
			})
			.catch((error) => {
				toast({
					title: "Error",
					description: "An error occurred while fetching question.",
					status: "error",
					duration: 9000,
					isClosable: true,
				});
				console.error(error);
			});
	}, []);

	useEffect(() => {
		axiosInstance
			.get<Answer[]>(`/questions/${questionId}/answers`)
			.then((response) => {
				console.log(response.data);
				setAnswers(response.data);
			})
			.catch((error) => {
				toast({
					title: "Error",
					description: "An error occurred while fetching answers.",
					status: "error",
					duration: 9000,
					isClosable: true,
				});
				console.error(error);
			});
	}, []);

	const handleAnswerStatus = (answerId: number, isPass: boolean | null) => {
		axiosInstance
			.patch<{ updated: number; isPass: boolean | null }>(
				`/answers/${answerId}`,
				{
					isPass: isPass,
				}
			)
			.then((response) => {
				toast({
					title: "Success",
					description: `Answer status changed to ${response.data.isPass}.`,
					status: "success",
					duration: 9000,
					isClosable: true,
				});
				setAnswers(
					answers.map((answer) => {
						if (answer.id === answerId) {
							return {
								...answer,
								isPass: Number(response.data.isPass),
							};
						}
						return answer;
					})
				);
			})
			.catch((error) => {
				toast({
					title: "Error",
					description: `An error occurred while toggling answer status. ${error.response?.data.error}`,
					status: "error",
					duration: 9000,
					isClosable: true,
				});
				console.error(error);
			});
	};

	return (
		<>
			<Heading my="4" textAlign="center">
				Question {questionId}/Answers&nbsp;
			</Heading>
			<Text fontWeight="bold">
				<Badge colorScheme={question?.color}>{question?.text}</Badge>
				&nbsp;{question?.question}
			</Text>
			{answers.map((answer, index) => {
				return (
					<ListItem
						key={index}
						identifier={{
							label: "answer",
							value: answer.id.toString(),
							colorScheme: "yellow",
						}}
						text={answer.author + ": " + answer.answer}
						actions={[
							<BaseIconButton
								ariaLabel="Accept Answer"
								colorScheme="green"
								icon={<BiCheck />}
								tooltipLabel="Accept Answer"
								tooltipPlacement="top"
								onClick={() => handleAnswerStatus(answer.id, true)}
							/>,
							<BaseIconButton
								ariaLabel="Reject Answer"
								colorScheme="red"
								icon={<BiX />}
								tooltipLabel="Reject Answer"
								tooltipPlacement="top"
								onClick={() => handleAnswerStatus(answer.id, false)}
							/>,
						]}>
						{answer.isPass === null ? (
							<Badge colorScheme="gray">Pending</Badge>
						) : answer.isPass ? (
							<Badge colorScheme="green">Accepted</Badge>
						) : (
							<Badge colorScheme="red">Rejected</Badge>
						)}
					</ListItem>
				);
			})}
		</>
	);
};

export default AnswersPage;
