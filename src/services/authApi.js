import { toast } from "react-toastify";
import { loginFailed, loginStart, loginSuccess } from "../redux/authSlice";
import { ROLES } from "../contains/role";
import { BASE_URL } from "./containt";
import axios from "axios";


const authApi = {
    loginUser: async (data, dispatch, navigate) => {
        dispatch(loginStart())
        try {
            const response = await axios.post(`${BASE_URL}/api/Login/Login`, data)
            toast.success("Login success");
            dispatch(loginSuccess(response.data))
            console.log(response.data);
            if (response.data.role === ROLES.ADMIN) {
                navigate('/home-Admin')
            } else if (response.data.role === ROLES.USER) {
                navigate('/home-User')
            }
            return response?.data?.id;
        } catch (error) {
            if (error.response.status === 400) {
                toast.error('Password wrong, please try again!')
                dispatch(loginFailed())
            }
        }
    },
    register: async (data,navigate) => {
        try {
             await axios.post(`${BASE_URL}/api/Login/Register`, data)
            toast.success("Register success");          
            navigate("/login") 
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

export default authApi
