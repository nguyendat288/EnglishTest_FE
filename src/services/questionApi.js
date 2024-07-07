import { toast } from "react-toastify";
import { BASE_URL } from "./containt";
import axios from "axios";


const questionApi = {

    createQuestion: async (data) => {
        try {
            await axios.post(`${BASE_URL}/api/Question`, data)
            toast.success("Create new question success");
        } catch (error) {
            toast.error('Something wrong')
        }
    },
    getAllQuestion: async () => {
        try {
            let res = await axios.get(`${BASE_URL}/getAllQuestion`)
            return res.data;
        } catch (error) {
            toast.error('Something wrong')
        }
    },
    removeQuestion: async (id) => {
        try {
            await axios.delete(`${BASE_URL}/Delete/${id}`)
            toast.success('Remove success')

        } catch (error) {
            toast.error('Something wrong')
        }
    },

}

export default questionApi
