import React, { useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    Popover,
    List,
    ListItem,
    ListItemText,
    Menu,
    MenuItem,
    Button,
    ListItemButton,
    Avatar,
    Divider,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logOutSuccess } from '../../redux/authSlice';
import {
    EmailOutlined,
    NotificationsNoneOutlined,
    MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { UseChatState } from '../../providers/ConnectContext';
import notificationApi from '../../services/notificationApi';

const TopBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [topMenuAnchorEl, setTopMenuAnchorEl] = useState(null);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const {
        connection,
        listNotification,
        setListNotification,
        numberOfNotification,
        setNumberOfNotification,
    } = UseChatState();

    const handleLogOut = async () => {
        dispatch(logOutSuccess());
        localStorage.clear();
        navigate('/login');
        await connection.stop();
        toast.success('Logout successfully!');
    };

    const handleNotificationClick = (event) => {
        setNumberOfNotification(0);
        setAnchorEl(event.currentTarget);
    }; 

    const handleNotificationClose = () => {
        setAnchorEl(null);
    };

    const handleMenuOpen = (event, notification) => {
        setMenuAnchorEl(event.currentTarget);
        setSelectedNotification(notification);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
        setSelectedNotification(null);
    };

    const handleMenuOptionClick = async (option) => {
        if (option === 'markAsRead') {
            await notificationApi.MarkToRead(selectedNotification?.notificationId);
            updateNotificationStatus(selectedNotification?.notificationId);
            console.log('Marking notification as read');
        } else if (option === 'delete') {
            await notificationApi.DeleteNotification(selectedNotification?.notificationId);
            removeNotificationStatus(selectedNotification?.notificationId);
            console.log('Deleting notification');
            // Add your logic to delete all notifications
        }
        handleMenuClose();
    };

    const handleTopMenuOpen = (event) => {
        setTopMenuAnchorEl(event.currentTarget);
    };

    const handleTopMenuClose = () => {
        setTopMenuAnchorEl(null);
    };

    const handleTopMenuOptionClick = (option) => {
        if (option === 'markAllAsRead') {
            // Add your logic to mark all notifications as read
            console.log('Marking all notifications as read');
        } else if (option === 'deleteAll') {
            // Add your logic to delete all notifications
            console.log('Deleting all notifications');
        }
        else if (option === 'check') {
            // Add your logic to delete all notifications
            console.log('check');
        }
        handleTopMenuClose();
    };

    const handleCheck = async (link, notificationId) => {
        await notificationApi.MarkToRead(notificationId);
        updateNotificationStatus(notificationId);
        console.log(link);
    };

    const getNotificationColor = (notificationType) => {
        return notificationType === 1 ? '#E6E6FA' : '#FF4500';
    };

    const updateNotificationStatus = (notificationId) => {
        setListNotification((prevNotifications) =>
            prevNotifications.map((notification) =>
                notification.notificationId === notificationId
                    ? { ...notification, notificationType: 0 }
                    : notification
            )
        );
    };

    const removeNotificationStatus = (notificationId) => {
        setListNotification((prevNotifications) =>
            prevNotifications.filter((notification) => notification.notificationId !== notificationId)
        );
    };

    return (
        <>
        <Box display='flex' justifyContent='space-between' p={2}>
            {/* search bar */}
            <Box display='flex' borderRadius='3px'>
                <InputBase placeholder='Search' sx={{ ml: 2, flex: 1 }} />
                <IconButton type='button' p={1}>
                    <SearchOutlinedIcon />
                </IconButton>
            </Box>
            {/* icons */}
            <Box display='flex'>
                <IconButton onClick={handleNotificationClick}>
                    <NotificationsNoneOutlined />
                    {numberOfNotification === 0 ? (
                        <></>
                    ) : (
                        <>
                            <Typography color='red'>{numberOfNotification}</Typography>
                        </>
                    )}
                </IconButton>
                <Popover
                    id='notifications-popover'
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handleNotificationClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Box p={2}>
                        <Box display='flex' justifyContent='space-between' alignItems='center'>
                            <Typography variant='h6'>Notifications</Typography>
                            <IconButton edge='end' aria-label='options' onClick={(e) => handleTopMenuOpen()}>
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                anchorEl={topMenuAnchorEl}
                                open={Boolean(topMenuAnchorEl)}
                                onClose={handleTopMenuClose}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <MenuItem onClick={() => handleTopMenuOptionClick('markAllAsRead')}>
                                    Mark All as Read
                                </MenuItem>
                                <MenuItem onClick={() => handleTopMenuOptionClick('deleteAll')}>
                                    Delete All
                                </MenuItem>
                            </Menu>
                        </Box>
                        <List sx={{ width: '250px' }}>
                            {listNotification?.length === 0 && (
                                <ListItem>
                                    <ListItemText secondary='No notifications' />
                                </ListItem>
                            )}
                            {listNotification?.length !== 0 &&
                                listNotification.map((item, index) => (
                                    <ListItemButton
                                        key={index}
                                        sx={{ backgroundColor: getNotificationColor(item?.notificationType) }}
                                    >
                                        <ListItemText
                                            onClick={() => handleCheck(item?.link, item?.notificationId)}
                                            primary={
                                                <React.Fragment>
                                                    <span>{item?.description}</span>
                                                    <br />
                                                    <span style={{ color: 'gray', fontSize: '0.8em' }}>
                                                        {new Date(item?.datetime).toLocaleString()}
                                                    </span>
                                                </React.Fragment>
                                            }
                                        />
                                        <IconButton
                                            edge='end'
                                            aria-label='options'
                                            onClick={(event) => handleMenuOpen(event, item)}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                    </ListItemButton>
                                ))}
                        </List>
                    </Box>
                </Popover>
                <Menu
                    anchorEl={menuAnchorEl}
                    open={Boolean(menuAnchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <MenuItem onClick={() => handleMenuOptionClick('markAsRead')}>Mark as Read</MenuItem>
                    <MenuItem onClick={() => handleMenuOptionClick('delete')}>Delete</MenuItem>
                </Menu>
                <IconButton>
                    <EmailOutlined />
                    <Typography color='red'>2</Typography>
                </IconButton>
                <IconButton onClick={handleLogOut}>
                    <LogoutIcon />
                </IconButton>
            </Box>
        </Box>
        <Divider/>
        <Outlet/>
        </>
    );
};

export default TopBar;
