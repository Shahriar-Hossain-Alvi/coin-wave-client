import { useState } from "react";
import AgentSignUpForm from "../components/AgentSignUpForm/AgentSignUpForm";
import UserSignupForm from "../components/UserSignupForm/UserSignupForm";
import { Slide } from "react-awesome-reveal";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const [activeTab, setActiveTab] = useState('user');
    const [pinError, setPinError] = useState('');
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleUserSignUp = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const mobileNumber = form.mobileNumber.value;
        const email = form.email.value;
        const pin = parseInt(form.pin.value);
        const role = "user";
        const status = "pending";
        const firstTimeLogin = "yes"
        const balance = 0;
        const profileCreationTime = new Date();

        if (pin.toString().length === 5) {
            setPinError('');
            const signUpData = {
                name, email, mobileNumber, pin, role, status, firstTimeLogin, balance, profileCreationTime
            }

            const res = await axiosPublic.post('/signup', signUpData);
            if (res.data.insertedId) {
                Swal.fire({
                    title: "Signup complete",
                    text: "Wait for admin approval before logging in to your account",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#008000",
                    confirmButtonText: "Ok"
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/login');
                    }
                });
            }
            else {
                Swal.fire("Sign up failed");
            }
        }
        else if (pin.toString().length > 5 || pin.toString().length < 5) {
            setPinError('Pin must be 5 digits');
        }
    }

    const handleAgentSignUp = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const mobileNumber = form.mobileNumber.value;
        const email = form.email.value;
        const pin = parseInt(form.pin.value);
        const role = "agent";
        const status = "pending";
        const firstTimeLogin = "yes"
        const balance = 0;
        const profileCreationTime = new Date();


        if (pin.toString().length === 5) {
            setPinError('');

            const signUpData = {
                name, email, mobileNumber, pin, role, status, firstTimeLogin, balance, profileCreationTime
            }

            const res = await axiosPublic.post('/users', signUpData);

            if (res.data.insertedId) {
                Swal.fire({
                    title: "Signup complete",
                    text: "Wait for admin approval before logging in to your account",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#008000",
                    confirmButtonText: "Ok"
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/login');
                    }
                });
            }
            else {
                Swal.fire("Sign up failed");
            }
        }
        else if (pin.toString().length > 5 || pin.toString().length < 5) {
            setPinError('Pin must be 5 digits');
        }


    }


    return (
        <div className="bg-cwCream overflow-hidden">

            <div className="pt-10 text-center">
                <button onClick={() => setActiveTab('user')} className={`btn ${activeTab === 'user' ? 'bg-cwViolate border-cwViolate text-white ' : 'bg-transparent text-black border-cwViolate'} rounded-full rounded-r-none hover:bg-cwOrange hover:text-white`}>User Registration</button>

                <button onClick={() => setActiveTab('agent')} className={`btn ${activeTab === 'agent' ? 'bg-cwViolate border-cwViolate text-white' : 'bg-transparent text-black border-cwViolate'} rounded-full hover:bg-cwOrange rounded-l-none hover:text-white`}>Agent Registration</button>
            </div>

            <div className="text-center mt-5">
                <p className="font-medium text-lg">Signed up already? <Link to='/login' className="text-cwOrange font-bold underline">Login</Link> to your account.</p>
            </div>


            {
                activeTab === 'user' ?
                    <Slide>
                        <UserSignupForm
                            handleUserSignUp={handleUserSignUp}
                            pinError={pinError}
                        ></UserSignupForm>
                    </Slide>
                    :
                    <Slide direction="right">
                        <AgentSignUpForm
                            handleAgentSignUp={handleAgentSignUp}
                            pinError={pinError}></AgentSignUpForm>
                    </Slide>
            }



        </div>
    );
};

export default Signup;