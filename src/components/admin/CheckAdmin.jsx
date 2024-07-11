import React, { useEffect, useState } from 'react'
import notificationApi from '../../services/notificationApi'
import { Box, Button, CircularProgress } from '@mui/material'
import Header from '../others/Header'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { UseChatState } from '../../providers/ConnectContext'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoadingComponent from '../others/LoadingComponent'

const CheckAdmin = () => {

    const [listUser, setListUser] = useState([])
    const { listNotification, connection } = UseChatState();
    const currentUser = useSelector((state) => state.auth.login?.currentUser);
    // const [loading, setLoading] = useState(false);

    // const handleLoading = () => {
    //     setLoading(true);
    //     // Simulate an async operation
    //     setTimeout(() => {
    //       setLoading(false);
    //     }, 2000);
    //   };

    const navigate = useNavigate()
    useEffect(() => {
        const getData = async () => {
            let res = await notificationApi.GetAllUser();
            setListUser(res)
        }
        getData();
    }, [])


    const columns = [
        {
            field: "userId",
            headerName: "userId",
            width: 140,
            headerAlign: 'center',

        },
        {
            field: "username",
            headerName: "username",
            width: 150,
            headerAlign: 'center',
        },
        {
            field: "email",
            headerName: "email",
            width: 150,
            headerAlign: 'center',
        },

        {
            field: '',
            headerName: "Action",
            width: 550,
            headerAlign: 'center',
            renderCell: (params) => (
                <>
                
                    <Button
                        variant='contained'
                        sx={{ mr: 1 }}
                        onClick={(e) => handleDetail(params?.row?.userId)}>Send Notification</Button>
                    <Button
                        variant='contained'
                        onClick={(e) => handleChat(params?.row?.userId)}>Nhắn tin</Button>
                </>
            )
        },
    ]

    const handleChat = (userId) => {
        navigate(`/chat/${userId}`)
    }

    const handleSendNoti = async () => {
        await notificationApi.SendNotificationToAll();
        // await connection.invoke("SendNotificationToAll", "check Notification sen All ")
    }
    const handleDetail = async (userId) => {
        let message = " check client";
        let sendUser = currentUser?.userId;
        let link = "http:reqjahdsfjassd";
        let data = {
            sendName: sendUser,
            recieveName: userId,
            description: message,
            link: link
        }
        await notificationApi.SendNotificationToClientByClass(data);

        // await notificationApi.SendNotificationToClient(message,username,sendUser );
        // console.log("send a persone : " + currentUser?.username);
        // console.log("reverosdjas a persone : " + username);
        //   await connection.invoke("SendNotificationToClient",message,username,sendUser)
    }

    return (
        <Box m={2}>
            <Box display='flex' justifyContent='space-between' alignItems="center">
                {/* <Header title="List User" subtitle="List all user" /> */}
                    <Button
                        variant='contained'
                        onClick={(e) => handleSendNoti()}>Send Notification To all </Button>
                    {/* <Button
                        variant='contained'
                        onClick={(e) => handleLoading()}>Loading </Button>
                              <LoadingComponent loading={loading} /> */}
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
                    rows={listUser}
                    columns={columns}
                    slots={{ toolbar: GridToolbar }}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    getRowId={(row) => row.userId}
                    pageSizeOptions={[5, 10]}
                // checkboxSelection
                />
            </Box>
        </Box>
    )
}

export default CheckAdmin
