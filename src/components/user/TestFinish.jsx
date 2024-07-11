import { Box, Button, Divider, Modal, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import testApi from '../../services/testApi';

const TestFinish = () => {
    const { newScore, dateStart, testId } = useParams();

    const [test, setTest] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            const res = await testApi.GetTestById(testId);
            setTest(res)
        }
        getData()
    }, [])

    const handleHome = () => {
        navigate(`/home-User`)
    }
    
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
                        Time : {test?.numberTime} minutes
                    </Typography>
                    <Divider />
                    <Box mt={3}>
                    </Box>
                    <Typography variant="h6" component="h2">
                        Mark :  {newScore}
                    </Typography>
                    <Typography variant="h6" component="h2">
                        StartDate : {formatDateTime(dateStart)} 
                    </Typography>
                    <Button variant='contained' onClick={(e) => handleHome()}>Home</Button>
                </Box>
            
            </Modal >
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
export default TestFinish
