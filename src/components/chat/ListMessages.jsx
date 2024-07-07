import { Avatar, Box, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react'

const ListMessages = ({ messages, currentUser }) => {
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]); // Scroll to bottom whenever messages change

    return (
        <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
            {messages.map((message, index) => (
                message.senderId === currentUser.userId ? (<>
                    <Box mt={2}>
                        <Box key={index} display='flex' alignItems='center'
                            justifyContent='flex-end'
                        >
                            <Box display='flex' alignItems='center' gap={2}>
                                <Typography variant="caption" >{message.sendDate}</Typography>

                                <Box bgcolor='#EEEEEE' borderRadius='10px' p={1}>
                                    <Typography>{message.messageText}</Typography>
                                </Box>
                                <Avatar alt="Avatar" src="/static/images/avatar/1.jpg" />

                            </Box>
                        </Box>
                    </Box>
                </>) : (<>
                    <Box mt={2}>
                        <Box key={index} display='flex' alignItems='center'
                            justifyContent='flex-start'
                        >
                            <Box display='flex' alignItems='center' gap={2}>
                                <Avatar alt="Avatar" src="/static/images/avatar/1.jpg" />
                                <Box bgcolor='#EEEEEE' borderRadius='10px' p={1}>
                                    <Typography>{message.messageText}</Typography>
                                </Box>
                            </Box>
                            <Typography variant="caption" >{message.sendDate}</Typography>
                        </Box>
                    </Box>
                </>)
            ))}
            <div ref={messagesEndRef} />

        </Box>
    )
}

export default ListMessages
