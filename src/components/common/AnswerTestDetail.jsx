import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import testApi from '../../services/testApi';
import { useSelector } from 'react-redux';
import Header from '../others/Header';
import { Box, Button, Checkbox, Divider, Typography } from '@mui/material';

const AnswerTestDetail = () => {
    const { testDetailId, testId,userId } = useParams();
    const [listQuestion, setListQuestion] = useState([])
    const [test, setTest] = useState([])
    const currentUser = useSelector((state) => state.auth.login?.currentUser);
    const navigate = useNavigate()

    useEffect(() => {
        const getData = async () => {
            let res = await testApi.GetAllQuestionByTestIdAndAnswerTest(testDetailId, testId);
            setListQuestion(res)
        }
        getData()
    }, [])

    useEffect(() => {
        const getData = async () => {
            let res = await testApi.GetTestDetailByUserIdAndTestDetailId(testDetailId, userId);
            setTest(res)
        }
        getData()
    }, [])

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
      
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
        const year = date.getFullYear();
        const hours = (date.getHours() + 7) % 24;
        const minutes = date.getMinutes().toString().padStart(2, '0'); // Add leading zero if needed
      
        return `${day}/${month}/${year}, ${hours}:${minutes}`;
      };

    return (
        <Box m={5}>
            <Header title="Test Detail" subtitle="review test detail " />
            <Typography component='h5' >Test Name : {test?.test?.testName}</Typography>
            <Typography component='h6'>Description : {test?.test?.description}</Typography>
            <Typography component='h6'>Total question  : {test?.test?.numberQuestion}</Typography>
            <Typography component='h6'>Time  : {test?.test?.numberTime} minutes</Typography>
            <Divider />
            <Typography component='h6'>Name : {test?.user?.username}</Typography>
            <Typography component='h6'>Score : {test?.score} / {test?.test?.numberQuestion}</Typography>
            <Typography component='h6'>Time Start : {formatDateTime(test?.timeStart)}</Typography>
            <Divider />
            <Box m={5}>
                {
                   listQuestion?.length !=0 &&  listQuestion?.map((item, index) => (<>
                        <Box mt={2}>
                            <Typography component='h6' fontWeight='bold'>Question : {item?.questionName}</Typography>
                            {
                                item?.answers.map((answer, answerIndex) => (<>
                                    <Box display='flex' key={answer?.answerId}>
                                        <Checkbox
                                            checked={item.anwserTests.some(
                                                (answerTest) =>
                                                    answerTest.answerId === answer.answerId &&
                                                    answerTest.questionId === answer.questionId
                                            )}
                                        />
                                        <Typography>{answer?.answer1}</Typography>
                                    </Box>
                                </>))
                            }
                            <Box>
                                <Typography fontWeight='bold' color='red'> Correct Answer :    </Typography>
                                {item?.answers.map((item1, index1) => (<>
                                    {(item1?.correct == 1 && (<>
                                        <Box display='flex'>
                                            <Typography>{item1?.answer1}</Typography>
                                        </Box>
                                    </>))}

                                </>))
                                }
                            </Box>
                        </Box>

                    </>))
                }
            </Box>

            <Button onClick={(e) => navigate(-1)}>Back</Button>
        </Box>
    )
}

export default AnswerTestDetail
