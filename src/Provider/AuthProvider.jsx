import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import useAxiosPublic from "../Hooks/useAxiosPublic";


export const AuthContext = createContext(null);


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const axiosPublic = useAxiosPublic();

    const saveAccessToken = (token) => {
        localStorage.setItem('access-token', token);
    }

    const loadUserFromLocalStorage = () => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
        setLoading(false);
    }

    useEffect(()=>{
        setLoading(true);
        loadUserFromLocalStorage();
    }, [])

    const authInfo = {
        user,
        saveAccessToken,
        setUser,
        loading,
        setLoading
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