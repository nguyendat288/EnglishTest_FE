import { Box, Card, CardActionArea, CardContent, Divider, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import testApi from '../../services/testApi'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ROLES } from '../../contains/role'
import Header from '../others/Header'

const ListTest = () => {
    const currentUser = useSelector((state) => state.auth.login?.currentUser);
  
    const [listTest, setListTest] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        const getData = async () => {
            let res = await testApi.GetAllTest();
            setListTest(res)
        }
        getData()

    }, [])

    const handleTestDetail = (id) => {
        if (currentUser?.role === ROLES.ADMIN) {
            navigate(`/test-detail-admin/${id}`)
        } else {

            navigate(`/test-start/${id}`)
        }
    }
    return (
        <>
            <Box m={3}>
                <Header title="List Test" subtitle="List all test" />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginLeft: '60px', mt: 4 }}>
                    <Grid container spacing={2} columns={12}>
                        {listTest.length !== 0 && listTest.map((item, index) => (
                            <>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Card sx={{ maxWidth: 350, maxHeight: 420 }}
                                    >
                                        <CardActionArea
                                            onClick={(e) => handleTestDetail(item?.testId)}
                                        >
                                            <Box sx={{ padding: '5px' }}>

                                                <CardContent>
                                                    <Typography fontSize='20px' mt={1}> {item?.testName}</Typography>
                                                    <Typography fontSize='15px'>{item?.description} </Typography>
                                                    <Divider />
                                                    <Box mt={3}>
                                                        <Typography color='green' fontWeight='bold'>Total question : {item?.numberQuestion} </Typography>
                                                        <Typography color='green' fontWeight='bold'>Total Time : {item?.numberTime} minutes </Typography>
                                                    </Box>
                                                </CardContent>
                                            </Box>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            </>
                        ))}
                    </Grid>
                </Box >
            </Box>

        </>
    )
}

export default ListTest
