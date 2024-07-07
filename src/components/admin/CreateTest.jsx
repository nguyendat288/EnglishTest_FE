import React, { useEffect, useState } from 'react'
import Header from '../others/Header'
import { Box, Button, TextField } from '@mui/material'
import ListQuestion from './ListQuestion'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import questionApi from '../../services/questionApi'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import testApi from '../../services/testApi'

const CreateTest = () => {
    const [testName, setTestName] = useState('')
    const [description, setDescription] = useState('')
    const [numberQuestion, setNumberQuestion] = useState(0)
    const [numberTime, setNumberTime] = useState(0)
    const [listQuestion, setListQuestion] = useState([])
    const [selectedQuestions, setSelectedQuestions] = useState([])
    const currentUser = useSelector((state) => state.auth.login?.currentUser);
    useEffect(() => {
        const getData = async () => {
            let res = await questionApi.getAllQuestion();
            setListQuestion(res)
        }
        getData();
    }, [])

    const handleSelectionChange = (newSelection) => {
        setSelectedQuestions(newSelection);
    }

    const handleCreateTest = async () => {
        if (testName == '' || description == '' || numberQuestion <= 0 || numberTime <= 0) {
            toast.error(`Please input full textfield `);
        } else {
            if (selectedQuestions.length == numberQuestion) {
                const data = {
                    testName: testName,
                    description: description,
                    numberQuestion: numberQuestion,
                    numberTime: numberTime,
                    createBy : currentUser?.userId,
                    list: selectedQuestions
                };
                await testApi.CreateTest(data);
            } else {
                toast.error(`Please select exactly ${numberQuestion} question`);
            }
        }
    }

    const columns = [
        {
            field: "questionId",
            headerName: "Question ID",
            width: 150,
            headerAlign: 'center',
        },
        {
            field: "questionName",
            headerName: "Description",
            width: 550,
            headerAlign: 'center',

        },

    ]


    return (
        <Box m={3}>
            <Header title="Create new Test" subtitle="Create new test for student" />
            <Box>
                <TextField
                    fullWidth
                    label="Test Name"
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                />
                <TextField
                    sx={{
                        marginTop: '15px'
                    }}
                    fullWidth
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Box mt={2} display='flex' justifyContent='space-between'>
                    <TextField
                        sx={{
                            width: '250px'
                        }}
                        type='number'
                        label="Total Question"
                        value={numberQuestion}
                        onChange={(e) => setNumberQuestion(e.target.value)}
                    />
                    <TextField
                        sx={{
                            width: '250px'
                        }}
                        type='number'
                        label="Total Time (munites)"
                        value={numberTime}
                        onChange={(e) => setNumberTime(e.target.value)}
                    />
                </Box>
            </Box>
            <Box>
                <Box
                    mt={3}
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
                        rows={listQuestion}
                        columns={columns}
                        slots={{ toolbar: GridToolbar }}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        getRowId={(row) => row.questionId}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection

                        onRowSelectionModelChange={(newRowSelectionModel) => {
                            setSelectedQuestions(newRowSelectionModel);
                        }}
                        rowSelectionModel={selectedQuestions}
                    />
                </Box>
            </Box>
            <Box mt={2} display='flex' justifyContent='flex-end'>
                <Button variant="contained" color="primary" onClick={(e) => handleCreateTest()}>
                    Create Test
                </Button>
            </Box>
        </Box>
    )
}

export default CreateTest
