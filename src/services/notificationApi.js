import { toast } from "react-toastify";
import { BASE_URL } from "./containt";
import axios from "axios";


const notificationApi = {
    
    GetAllUser: async (data,navigate) => {
        try {
            let res = await axios.get(`${BASE_URL}/api/User`)
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
    GetAllNotification: async (userId) => {
        try {
            let res = await axios.get(`${BASE_URL}/api/User/GetNotificationByUserId/${userId}`)
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
    MarkToRead: async (notificationId) => {
        try {
            let res = await axios.put(`${BASE_URL}/api/User/notification/${notificationId}`)
            console.log("dấdasdasdasdsad");
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
    DeleteNotification: async (notificationId) => {
        try {
            let res = await axios.delete(`${BASE_URL}/api/User/notification/${notificationId}`)
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
    SendNotificationToAll: async () => {
        try {
            let res = await axios.get(`${BASE_URL}/api/User/notification`)
        } catch (error) {
            if (error.response.status === 501) {
                toast.error('Email not fomat')
            }
            if (error.response.status === 500) {
                toast.error('Email or username was exist')
            }
        }
    },
    SendNotificationToClient: async (message,username,sendUser ) => {
        try {
            let res = await axios.post(`${BASE_URL}/api/User/noti/${message}/${username}/${sendUser}`)
        } catch (error) {
            if (error.response.status === 501) {
                toast.error('Email not fomat')
            }
            if (error.response.status === 500) {
                toast.error('Email or username was exist')
            }
        }
    },
    SendNotificationToClientByClass: async (data) => {
        try {
            let res = await axios.post(`${BASE_URL}/api/User/notification`,data)
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

export default notificationApi
