import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import testApi from '../../services/testApi';
import { Box, Button, Typography } from '@mui/material';
import Header from '../others/Header';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

const ListTestDetail = () => {
    const currentUser = useSelector((state) => state.auth.login?.currentUser);
    const [listTest, setListTest] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const getData = async () => {
            let res = await testApi.GetAllTestDetailByUserId(currentUser?.userId);
            setListTest(res)
        }
        getData()
    }, [])

    const columns = [
        {
            field: "testId",
            headerName: "Test Id",
            width: 150,
        },
        {
            field: "testName",
            headerName: "Test Name",
            width: 250,
            renderCell: (params) => (
                <>
                    <Box mt={2}>
                        <Typography>{params?.row?.test?.testName}</Typography>
                    </Box>

                </>
            )
        },
        {
            field: "timeStart",
            headerName: "Time Start",
            width: 250,
            renderCell: (params) => (
                <>
                    <Box mt={2}>
                        <Typography> {formatDateTime(params?.row?.timeStart)} </Typography>
                    </Box>
                </>
            )
        },
        {
            field: "score",
            headerName: "Score",
            width: 100,
            renderCell: (params) => (
                <>
                    <Box mt={2}>

                        <Typography> {params?.row?.score}/{params?.row?.test?.numberQuestion} </Typography>
                    </Box>
                </>
            )
        },
        {
            field: "gg",
            headerName: "Action",
            width: 100,
            renderCell: (params) => (
                <>
                    <Button variant='contained' onClick={(e) => handleDetail(params?.row?.testDetailId, params?.row?.testId,params?.row?.user?.userId)}>Detail</Button>
                </>
            )
        }
    ]

    const handleDetail = (testDetailId, testId,userId) => {
        navigate(`/answer-test-detail/${testDetailId}/${testId}/${userId}`)
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
            {listTest && listTest.length == 0 && (<>
                <Box m={2}>
                    <Typography> Nothing to show   </Typography>
                </Box>
            </>)}
            {listTest && listTest?.length != 0 && (<>
                <Box m={2}>
                    <Box display='flex' justifyContent='space-between' alignItems="center">
                        <Header title="List Test" subtitle="List All test" />
                    </Box>
                    <Box
                        height="75vh"
                        sx={{
                            "& .MuiDataGrid-root": {
                                border: "none",
                            },
                            "& .MuiDataGrid-cell": {
                                borderBottom: "none",
                            },
                            "& .name-column--cell": {
                                color: '#94e2cd',
                            },
                            "& .MuiButton-textPrimary": {
                                color: "#000",
                            },
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: "red",
                                borderBottom: "none",
                                color: "#000",
                                fontSize: '16px'
                            },
                            "& .MuiDataGrid-footerContainer": {
                                borderTop: "none",
                                backgroundColor: '#00FFFF',
                            },
                        }}
                    >
                        <DataGrid
                            rows={listTest}
                            columns={columns}
                            slots={{ toolbar: GridToolbar }}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            getRowId={(row) => row?.timeStart}
                            pageSizeOptions={[5, 10]}
                        //  checkboxSelection
                        />
                    </Box>
                </Box>

            </>)}
        </>
    )
}

export default ListTestDetail
