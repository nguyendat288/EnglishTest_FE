import { Box, Typography } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import TopBar from '../others/TopBar';
import SideBarAdmin from './SideBarAdmin';
import { Outlet } from 'react-router-dom';

const HomeAdmin = () => {
    const currentUser = useSelector((state) => state.auth.login?.currentUser);
    console.log(currentUser);
    return (
        <Box display='flex'>
            <SideBarAdmin />
            <Box flex='4'>
                <TopBar />
                <Box>
                </Box>
            </Box>
        </Box>
    )
}

export default HomeAdmin
