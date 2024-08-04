import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Swal from "sweetalert2";


export const AuthContext = createContext(null);


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const userInfo = localStorage.getItem('userInfo');
        return userInfo ? JSON.parse(userInfo) : null;
    });
    const [loading, setLoading] = useState(true);
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

    //function to update user info after first login
    const updateUserInfoAfterFirstLogin = async (id) => {

        if (user?.role === 'user' && user?.firstTimeLogin === 'yes') {
            const token = localStorage.getItem('access-token');
            const res = await axiosPublic.patch('/usersFirstLogin', { id }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Congratulations! You've got 40tk bonus",
                    showConfirmButton: false,
                    timer: 1500
                });

                //update local user data
                const updatedUser = { ...user, balance: user.balance + 40, firstTimeLogin: 'no' };
                setUser(updatedUser);
                localStorage.setItem('userInfo', JSON.stringify(updatedUser));
            }

        }


        if (user?.role === 'agent' && user?.firstTimeLogin === 'yes') {
            const token = localStorage.getItem('access-token');
            const res = await axiosPublic.patch('/agentsFirstLogin', { id }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Congratulations! You've got 10000tk bonus",
                    showConfirmButton: false,
                    timer: 1500
                });

                //update local user data
                const updatedUser = { ...user, balance: user.balance + 10000, firstTimeLogin: 'no' };
                setUser(updatedUser);
                localStorage.setItem('userInfo', JSON.stringify(updatedUser));
            }

        }
    };



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
        logout,
        updateUserInfoAfterFirstLogin
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