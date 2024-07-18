/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import LoginWithEmail from "../components/LoginWithEmail/LoginWithEmail";
import LoginWithMobile from "../components/LoginWithMobile/LoginWithMobile";
import { Slide } from "react-awesome-reveal";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { AuthContext } from "../Provider/AuthProvider";


const Login = () => {
    const [loginMethod, setLoginMethod] = useState('email');
    const [pinError, setPinError] = useState('');
    const axiosPublic = useAxiosPublic();
    const { saveAccessToken, loading, setLoading, setUser, user } = useContext(AuthContext);
    const navigate = useNavigate();

    console.log(user);

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


    const handleLogInWithEmail = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const pin = form.pin.value;

        if (pin.toString().length === 5) {
            setPinError('');
            const loginData = {
                email, pin
            }

            setLoading(true);
            const res = await axiosPublic.post('/login', loginData);

            if (res.data.token) {
                saveAccessToken(res.data.token);
                if (localStorage.getItem('access-token')) {
                    await getUserInfo();
                    navigate('/');
                }
            }
            else {
                setLoading(false);
            }
        }
        else if (pin.toString().length > 5 || pin.toString().length < 5) {
            setPinError('Pin must be 5 digits');
        }
    }

    const handleLogInWithMobile = e => {
        e.preventDefault();
        const form = e.target;
        const mobileNumber = form.mobileNumber.value;
        const pin = form.pin.value;

        const logInData = {
            mobileNumber, pin
        }

        console.log(logInData);
    }



    return (
        <div className="bg-cwCream overflow-hidden">
            <div className="pt-10 text-center">
                <button onClick={() => setLoginMethod('email')} className={`btn ${loginMethod === 'email' ? 'bg-cwViolate border-cwViolate text-white' : 'bg-transparent text-black border-cwViolate'}  rounded-full rounded-r-none hover:bg-cwOrange hover:text-white`}>Login using Email</button>

                <button onClick={() => setLoginMethod('mobile')} className={`btn ${loginMethod === 'mobile' ? 'bg-cwViolate border-cwViolate text-white' : 'bg-transparent text-black border-cwViolate'} rounded-full hover:bg-cwOrange rounded-l-none hover:text-white`}>Login using Mobile number</button>
            </div>

            <div className="text-center mt-5">
                <p className="font-medium text-lg">Don't have an account? <Link to='/signup' className="text-cwOrange font-bold underline">Signup</Link> now.</p>
            </div>

            {
                loginMethod === 'email' ?
                    <Slide>
                        <LoginWithEmail handleLogInWithEmail={handleLogInWithEmail}
                            pinError={pinError}
                        ></LoginWithEmail>
                    </Slide>
                    :
                    <Slide direction="right">
                        <LoginWithMobile handleLogInWithMobile={handleLogInWithMobile}
                            pinError={pinError}></LoginWithMobile>
                    </Slide>
            }
        </div>
    );
};

export default Login;