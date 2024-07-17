import { createContext, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import PropTypes from 'prop-types';

export const AuthContext = createContext(null);


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const axiosPublic = useAxiosPublic();

    const saveAccessToken = token => {
        localStorage.setItem('access-token', token);
    }

    const authInfo = {
        user,
        loading,
        setLoading,
        saveAccessToken
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