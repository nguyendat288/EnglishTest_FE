import { Box, Button, Divider, Modal,  Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import testApi from '../../services/testApi';

const TestStart = () => {
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
        navigate(`/quiz/${testId}/${test?.numberTime}`, { replace: true })
    }
    
    return (
        <>
            <Modal
                open="true"
            >
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        {test?.testName}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        {test?.description}
                    </Typography>
                    <Divider />
                    <Box mt={3}>

                    </Box>
                    <Typography variant="h6" component="h2">
                        Total Question :  {test?.numberQuestion}
                    </Typography>
                    <Typography variant="h6" component="h2">
                        Time : {test?.numberTime} munites
                    </Typography>
                    <Button variant='contained' onClick={(e) => handleStart()}>Start</Button>
                </Box>
            </Modal>
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
export default TestStart
