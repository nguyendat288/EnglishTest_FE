import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from '../others/Header'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import questionApi from '../../services/questionApi'

const ListQuestion = () => {

    const [listQuestion, setListQuestion] = useState([])

    useEffect(() => {
        const getData = async () => {
            let res = await questionApi.getAllQuestion();
            setListQuestion(res)
        }
        getData();
    }, [])


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
        {
            field: '',
            headerName: "Action",
            width: 250,
            headerAlign: 'center',
            renderCell: (params) => (
                <>
                    {/* <Button onClick={(e) => handleDetail(params?.row?.questionId)}>Detail</Button> */}
                    <Button onClick={(e) => handleRemove(params?.row?.questionId)}>Remove</Button>
                </>
            )
        },

    ]


    const handleRemove = async (id) => {
        const updatedList = listQuestion.filter((item) => item.questionId !== id);
        setListQuestion(updatedList);
        await questionApi.removeQuestion(id)
    }
    return (
        <Box m={2}>
            <Box display='flex' justifyContent='space-between' alignItems="center">
                <Header title="List Question" subtitle="List all question" />
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
                    rows={listQuestion}
                    columns={columns}
                    slots={{ toolbar: GridToolbar }}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    getRowId={(row) => row.questionId}
                    pageSizeOptions={[5, 10]}
                   // checkboxSelection
                />
            </Box>
        </Box>
    )
}

export default ListQuestion
