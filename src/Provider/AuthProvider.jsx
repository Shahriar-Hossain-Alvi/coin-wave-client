import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import useAxiosPublic from "../Hooks/useAxiosPublic";


export const AuthContext = createContext(null);


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const axiosPublic = useAxiosPublic();


    //save access token
    const saveAccessToken = (token) => {
        localStorage.setItem('access-token', token);
    }

    //save user info in the local storage
    const getUserInfo = async () => {
        const token = localStorage.getItem('access-token');
        if (!token) {
            console.log('Token not found');
            setLoading(false);
            return;
        }

        else if (token) {
            const res = await axiosPublic.get('/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.data) {
                setLoading(false);
                setUser(res.data);
                localStorage.setItem('userInfo', JSON.stringify(res.data));
            }
        }
    }

    //load user data from local storage
    const loadUserFromLocalStorage = () => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
        setLoading(false);
    }


    //logout user
    const logout = () => {
        localStorage.removeItem('access-token');
        localStorage.removeItem('userInfo');
        setUser(null);
    };

    useEffect(() => {
        setLoading(true);
        loadUserFromLocalStorage();
    }, [])

    const authInfo = {
        user,
        saveAccessToken,
        setUser,
        loading,
        setLoading,
        getUserInfo,
        logout
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node
}


export default AuthProvider;