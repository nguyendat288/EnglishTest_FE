import { toast } from "react-toastify";
import { BASE_URL } from "./containt";
import axios from "axios";


const testApi = {
    GetAllTest: async () => {
        try {
            let res = await axios.get(`${BASE_URL}/GetAllTest`)
            return res.data;
        } catch (error) {
            toast.error('Something wrong')
        }
    },
    GetTestById: async (testId) => {
        try {
            let res = await axios.get(`${BASE_URL}/GetTestById/${testId}`)
            return res.data;
        } catch (error) {
            toast.error('Something wrong')
        }
    },
    GetAllTestDetailByTestId: async (testId) => {
        try {
            let res = await axios.get(`${BASE_URL}/GetTestDetailByTestId/${testId}`)
            return res.data;
        } catch (error) {
            toast.error('Something wrong')
        }
    },
    GetAllTestDetailByUserId: async (userId) => {
        try {
            let res = await axios.get(`${BASE_URL}/GetAllTestDetailByUserId/${userId}`)
            return res.data;
        } catch (error) {
        }
    },
    GetAllQuestionByTestId: async (testId) => {
        try {
            let res = await axios.get(`${BASE_URL}/GetAllQuestionByTestId/${testId}`)
            return res.data;
        } catch (error) {
            toast.error('Something wrong')
        }
    },
    GetAllQuestionByTestIdAndAnswerTest: async (testDetailId,testId) => {
        try {
            let res = await axios.get(`${BASE_URL}/GetAllQuestionByTestIdAndAnswerTest/${testDetailId}/${testId}`)
            return res.data;
        } catch (error) {
            toast.error('Something wrong')
        }
    },
    GetTestDetailByUserIdAndTestDetailId: async (testDetailId,testId) => {
        try {
            let res = await axios.get(`${BASE_URL}/GetTestDetailByUserIdAndTestDetailId/${testDetailId}/${testId}`)
            return res.data;
        } catch (error) {
            toast.error('Something wrong')
        }
    },
    // addAnswerTest: async (data,testId,testDetailId) => {
    //     try {
    //          await axios.post(`${BASE_URL}/addAnswerTest/${testId}/${testDetailId}`,data)
    //         toast.success("submit success")
    //     } catch (error) {
    //     }
    // },
    addTestDetail: async (data) => {
        try {
            await axios.post(`${BASE_URL}/addTestDetail`,data)
            toast.success("Submit success")
        } catch (error) {
        }
    },
    CreateTest: async (data) => {
        try {
            let res = await axios.post(`${BASE_URL}/test`,data)
            toast.success("Add success")
            return res.data
        } catch (error) {
        }
    },

}

export default testApi
