import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import messageSound from "../assets/sound/message.mp3";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useSelector } from "react-redux";
import notificationApi from "../services/notificationApi";
import chatApi from "../services/chatApi";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const currentUser = useSelector((state) => state.auth.login?.currentUser);

  const [listNotification, setListNotification] = useState([])
  const [connection, setConnection] = useState(null)
  const [isConnect, setIsConnect] = useState(false);
  const [numberOfNotification, setNumberOfNotification] = useState(0);

  const [chatSelect, setChatSelect] = useState(0);
  const [listMessages, setListMessage] = useState([])
  const [listUserMessage, setListUserMessage] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        if (!isConnect && currentUser) {
          const connection = new HubConnectionBuilder()
            .withUrl("https://localhost:7277/chat")
            .configureLogging(LogLevel.Information)
            .build();

          connection.on("ReceivedNotification", (data) => {
            const sound = new Audio(messageSound);
            sound.play();
            setListNotification((prevNotifications) => [data, ...prevNotifications]);
            setNumberOfNotification((prevNumber) => prevNumber + 1);
          });

          connection.on("ReceivedMessage", (data) => {
            setListMessage(msg => [...msg,  data ])
          })

          // connection.on("ReceivedUser", (data) => {
          //   setListUserMessage(data)
          // })

          connection.onclose(e => {
            setConnection(null);
            setIsConnect(false)
            setListNotification([])
          });

          await connection.start();
          await connection.invoke("SaveUserConnection", currentUser?.username)
          setConnection(connection);
        }
      } catch (e) {
      }
    }
    getData()
  }, [currentUser])

  useEffect(() => {
    const getNotification = async () => {
      if (currentUser != null) {
        let res = await notificationApi.GetAllNotification(currentUser?.userId)
        setListNotification(res)
      }
    }
    getNotification()
  }, [currentUser])

  useEffect(() => {
    const getMessage = async () => {
      let res = await chatApi.GetMessageByConversation(chatSelect);
      setListMessage(res)
    }
    getMessage()
  }, [chatSelect])
  
  useEffect(() => {
    const getData = async () => {
      let res = await chatApi.GetUserMessage(currentUser?.userId)
      setListUserMessage(res)
    }
    getData()
  }, [])


  return (
    <ChatContext.Provider
      value={{
        listNotification,
        setListNotification,
        connection,
        setConnection,
        isConnect,
        setIsConnect,
        numberOfNotification,
        setNumberOfNotification,
        chatSelect,
        setChatSelect,
        listMessages,
        setListMessage,
        listUserMessage,
        setListUserMessage
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const UseChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
