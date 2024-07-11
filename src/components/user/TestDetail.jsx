import {  Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import testApi from '../../services/testApi';

const TestDetail = () => {
    const { testId } = useParams();
    const [test, setTest] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        const getData = async () => {
            let res = await testApi.GetTestById(testId);
            setTest(res);
        }
        getData()
    }, [])

    const handleStart = () => {
        navigate(`/quiz/${testId}`)
    }
    return (
        <>
           <Typography> Hello </Typography>
        </>
    )
}
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export default TestDetail
