import { InsertEmoticon } from '@mui/icons-material';
import { Box, IconButton, ListItemButton, ListItemText, Typography } from '@mui/material';
import React, { useState } from 'react'

const ListUser = ({ listUser, currentUser,hanldeSelectChat }) => {
    console.log(listUser);
    const getMessageColor = (isRead, senderId) => {
        if (senderId == currentUser?.userId) {
            return "EEEEEE";
        } else {
            return isRead === 1 ? '#EEEEEE' : '#CCFFFF';
        }
    }

    return (
        <Box m={3} borderRight='1px solid #ccc'>
            <Typography> List User </Typography>
            {listUser.length == 0 && (<>
                <Typography fontWeight='bold'>Chưa kết nối ai </Typography>
            </>)}
            {listUser.length != 0 && listUser.map((item, index) => (
                <ListItemButton
                    key={index}
                    sx={{ backgroundColor: getMessageColor(item?.isRead, item?.senderId) }}
                >
                    <ListItemText
                          onClick={() => hanldeSelectChat(item?.conversationId,item?.userId)}
                        primary={
                            <React.Fragment>
                                <span>{item?.userName}</span>
                                <br />
                                {item?.senderId == currentUser?.userId && (
                                    <>
                                        <span>Bạn : {item?.messageText}</span>
                                    </>
                                )}
                                 {item?.senderId != currentUser?.userId && (
                                    <>
                                        <span> {item?.messageText}</span>
                                    </>
                                )}
                                <br />
                                <span style={{ color: 'gray', fontSize: '0.8em' }}>
                                    {new Date(item?.sendDate).toLocaleString()}
                                </span>
                            </React.Fragment>
                        }
                    />
                </ListItemButton>
            ))}

        </Box>
    )
}

export default ListUser
