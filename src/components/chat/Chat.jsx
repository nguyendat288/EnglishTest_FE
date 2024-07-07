import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import ListUser from './ListUser';
import BoxChat from './BoxChat';
import chatApi from '../../services/chatApi';
import { UseChatState } from '../../providers/ConnectContext';

const Chat = () => {
  const { userId } = useParams();
  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  const [user, setUser] = useState();
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const {
    connection,
    chatSelect,
    setChatSelect,
    listMessages,
    setListMessage,
    listUserMessage,
    setListUserMessage
  } = UseChatState();

  useEffect(() => {
    const getUser = async () => {
      let res = await chatApi.GetInfo(userId)
      setUser(res)
    }
    getUser()
  }, [chatSelect])

  const hanldeSelectChat = (conversationId, userId) => {
    console.log(userId);
    setChatSelect(conversationId)
    navigate(`/chat/${userId}`)
  }

  const handleSendMessage = async (message) => {
    let data ={
      conversationId : chatSelect,
      senderId : currentUser?.userId,
      messageText : message
    }
    console.log(data);
    await chatApi.SendMessage(data)
    setMessage('')
  }

  return (
    <Box display='flex'>
      <Box flex='1'>
        <ListUser listUser={listUserMessage} currentUser={currentUser}
          hanldeSelectChat={hanldeSelectChat} />
      </Box>
      <Box flex='4'>
        <BoxChat messages={listMessages}
          currentUser={currentUser}
          user={user}
          handleSendMessage={handleSendMessage}
          setMessage ={setMessage}
          message={message}
          />
      </Box>
    </Box>
  )
}

export default Chat
