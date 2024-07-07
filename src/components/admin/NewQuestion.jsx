import { Box, Button, Checkbox, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Header from '../others/Header';
import questionApi from '../../services/questionApi';
import { toast } from 'react-toastify';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
const NewQuestion = () => {
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState([{ answer1: '', correct: 0 }]);

    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
    };

    const handleAnswerChange = (index, e) => {
        const newAnswers = answers.map((answer, i) =>
            i === index ? { ...answer, answer1: e.target.value } : answer
        );
        setAnswers(newAnswers);
    };

    const handleIsCorrectChange = (index) => {
        const newAnswers = answers.map((answer, i) =>
            i === index ? { ...answer, correct: !answer.correct == false ? 0 : 1 } : answer
        );
        setAnswers(newAnswers);
    };

    const validate = () => {
        if (!question.trim()) {
            toast.error('Question cannot be empty.');
            return false;
        }
        for (let i = 0; i < answers.length; i++) {
            if (!answers[i].answer1.trim()) {
                toast.error(`Answer ${i + 1} cannot be empty.`);
                return false;
            }
        }
        return true;
    };

    const addAnswer = () => {
        setAnswers([...answers, { answer1: '', correct: 0 }]);
    };
    const handleSubmit = async () => {
        if (!validate()) {
        } else {
            let data = {
                questionName: question,
                answers: answers
            }
            console.log(data);
            await questionApi.createQuestion(data)
            reset()
        }

    }
    const reset = () => {
        setQuestion('')
        setAnswers([{ answer1: '', correct: 0 }])
    }
    const removeAnswer = (index) => {
        setAnswers(answers.filter((_, i) => i !== index));
    };
    return (
        <Box m={2}>
            <Header title="Create new question" subtitle="Create new question for test " />
            <Box>
                <TextField
                    fullWidth
                    label="Question"
                    value={question}
                    onChange={handleQuestionChange}
                />

                {answers.length !=0 && answers.map((answer, index) => (
                    <Box display='flex' key={index} mt={2}>
                        <TextField
                            sx={{
                                width:'60%'
                            }}
                            label={`Answer ${index + 1}`}
                            value={answer.answer1}
                            onChange={(e) => handleAnswerChange(index, e)}
                        />
                        <Box flex='1' display='flex' flexDirection='column' alignItems='center'>
                            <Typography>Correct?</Typography>
                            <Checkbox
                                checked={answer.correct == 0 ? false : true}
                                onChange={() => handleIsCorrectChange(index)}
                            />
                        </Box>

                        <Button onClick={() => removeAnswer(index)}  >
                            <CancelPresentationIcon />
                        </Button>
                    </Box>
                ))}
                <Button onClick={addAnswer} mt={2}>More Answer</Button>
            </Box>
            <Button
                variant='contained'
                onClick={(e) => handleSubmit(e)}>Create new Question</Button>
        </Box>
    );
};

export default NewQuestion;
