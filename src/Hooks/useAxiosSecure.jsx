import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const axiosSecure = axios.create({
    baseURL: 'https://coin-wave-server.vercel.app',
    // baseURL: 'http://localhost:5000',
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);


    //request interceptor to add authorization header for every secure call to the api
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token');
        config.headers.authorization = `Bearer ${token}`
        // console.log('request stopped by interceptors', token);
        return config;
    }, (error) => {
        // Do something with request error
        return Promise.reject(error);
    })


    //intercepts 401 and 403 status
    axiosSecure.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, async (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        const status = error.response.status;
        // console.log('status error in', status);
        if (status === 401 || status === 403) {
            await logout();
            navigate('/login');
        }
        return Promise.reject(error);
    });
    return axiosSecure;
};

export default useAxiosSecure;