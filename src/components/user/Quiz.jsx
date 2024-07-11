import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import testApi from '../../services/testApi';
import { Box, Button, Checkbox, Modal, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const Quiz = () => {
  const { testId, time } = useParams();
  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  const [listQuestion, setListQuestion] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const currentQuestion = listQuestion[currentQuestionIndex];
  const [timeRemaining, setTimeRemaining] = useState(time * 60);
  const timerRef = useRef(null);
  const [datetime, setDatetime] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!isQuizFinished && !isConfirmed) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isQuizFinished, isConfirmed]);

  useEffect(() => {
    // Add a new state to the browser history
    window.history.pushState(null, '', window.location.href);
    const handlePopState = (e) => {
      if (!isQuizFinished && !isConfirmed) {
        setIsModalOpen(true);
        window.history.pushState(null, '', window.location.href); // Prevent back navigation
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isQuizFinished, isConfirmed]);

  const handleLeave = () => {
    navigate("/list-test");
  };

  const handleStay = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {

    if (timeRemaining > 0 && !isQuizFinished) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      handleFinishQuiz();
    }
    return () => clearInterval(timerRef.current);
  }, [timeRemaining, isQuizFinished]);

  useEffect(() => {
    const getData = async () => {
      let res = await testApi.GetAllQuestionByTestId(testId);
      setListQuestion(res);
    };
    getData();
  }, [testId]);

  const handleAnswerChange = (questionId, answerId) => {
    setUserAnswers(prevAnswers => {
      const existingQuestion = prevAnswers.find(answer => answer.questionId === questionId);
      if (existingQuestion) {
        const updatedAnswers = existingQuestion.answer.includes(answerId)
          ? existingQuestion.answer.filter(id => id !== answerId)
          : [...existingQuestion.answer, answerId];

        return prevAnswers.map(answer =>
          answer.questionId === questionId ? { ...answer, answer: updatedAnswers } : answer
        );
      } else {
        return [...prevAnswers, { questionId, answer: [answerId] }];
      }
    });
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  const handleBackQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleFinishQuiz = async () => {
    // Stop the timer
    clearInterval(timerRef.current);
    setTimeRemaining(0);

    // Calculate the score
    let newScore = 0;
    listQuestion.forEach((question) => {
      const correctAnswers = question.answers.filter((answer) => answer.correct === 1).map((answer) => answer.answerId);
      const userSelectedAnswers = userAnswers.find(answer => answer.questionId === question.questionId)?.answer || [];
      if (correctAnswers.length === userSelectedAnswers.length && correctAnswers.every(id => userSelectedAnswers.includes(id))) {
        newScore += 1;
      }
    });
    let data = {
      userId: currentUser?.userId,
      score: newScore,
      timeStart: datetime,
      testId: testId,
      list: userAnswers
    };
    await testApi.addTestDetail(data);
    setIsQuizFinished(true);
    navigate(`/test-finish/${newScore}/${datetime}/${testId}`, { replace: true });
  };

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;


  return (
    <Box m={3}>
      <Typography>Time Remaining: {minutes}:{seconds < 10 ? '0' : ''}{seconds}</Typography>
      <Typography>Question {currentQuestionIndex + 1} / {listQuestion.length}</Typography>
      <Typography>{currentQuestion?.questionName}</Typography>

      <Box>
        {currentQuestion?.answers.map((item, index) => (
          <Box display='flex' key={item?.answerId}>
            <Checkbox
              checked={
                userAnswers.find(answer => answer.questionId === currentQuestion.questionId)?.answer.includes(item.answerId) || false
              }
              onChange={() => handleAnswerChange(currentQuestion.questionId, item.answerId)}
            />
            <Typography>{item?.answer1}</Typography>
          </Box>
        ))}
      </Box>

      <Box mt={3}>
        {currentQuestionIndex == 0 && (
          <>
            <Button variant="contained" color="primary" onClick={handleNextQuestion}>
              Next Question
            </Button>
          </>
        )}

        {currentQuestionIndex !== 0 && currentQuestionIndex < listQuestion.length - 1 && (
          <>
            <Button variant="contained" color="primary" onClick={handleBackQuestion}>
              Back Question
            </Button>
            <Button variant="contained" color="primary" onClick={handleNextQuestion}>
              Next Question
            </Button>
          </>
        )}

        {currentQuestionIndex !== 0 && currentQuestionIndex == listQuestion.length - 1 && (
          <>
            <Button variant="contained" color="primary" onClick={handleBackQuestion}>
              Back Question
            </Button>
          </>
        )}
      </Box>

      <Box
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1000
        }}
      >
        <Button variant="contained" color="secondary" onClick={handleFinishQuiz}>
          Finish Quiz
        </Button>
      </Box>

      <Modal open={isModalOpen}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Are you sure you want to leave?
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Your progress will be lost if you leave the page.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" onClick={() => handleLeave()}>
              Leave
            </Button>
            <Button variant="contained" color="secondary" onClick={() => handleStay()}>
              Stay
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Quiz;
