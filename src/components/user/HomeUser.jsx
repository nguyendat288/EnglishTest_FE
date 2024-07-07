import { Box } from '@mui/material';
import React from 'react'
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import TopBar from '../others/TopBar';

const HomeUser = () => {
    return (
        <Box display='flex'>
            <SideBar />
            <Box flex='4'>
                <TopBar />
                <Box>
                </Box>
            </Box>
        </Box>
    )
}

export default HomeUser
