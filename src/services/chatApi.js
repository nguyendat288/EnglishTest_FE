import { toast } from "react-toastify";
import { BASE_URL } from "./containt";
import axios from "axios";


const chatApi = {
    
    GetUserMessage: async (data) => {
        try {
            let res = await axios.get(`${BASE_URL}/api/User/UserMessage?userId=${data}`)
             return res?.data;
        } catch (error) {
            if (error.response.status === 501) {
                toast.error('Email not fomat')
            }
            if (error.response.status === 500) {
                toast.error('Email or username was exist')
            }
        }
    },
    GetMessageByConversation: async (data) => {
        try {
            let res = await axios.get(`${BASE_URL}/api/User/GetMessageByConversation?conversationId=${data}`)
             return res?.data;
        } catch (error) {
            if (error.response.status === 501) {
                toast.error('Email not fomat')
            }
            if (error.response.status === 500) {
                toast.error('Email or username was exist')
            }
        }
    },
    GetInfo: async (data) => {
        try {
            let res = await axios.get(`${BASE_URL}/api/User/Info?userId=${data}`)
             return res?.data;
        } catch (error) {
            if (error.response.status === 501) {
                toast.error('Email not fomat')
            }
            if (error.response.status === 500) {
                toast.error('Email or username was exist')
            }
        }
    },
    SendMessage: async (data) => {
        try {
            let res = await axios.post(`${BASE_URL}/api/User/SendMessage`,data)
            
        } catch (error) {
            if (error.response.status === 501) {
                toast.error('Email not fomat')
            }
            if (error.response.status === 500) {
                toast.error('Email or username was exist')
            }
        }
    },
}

export default chatApi
