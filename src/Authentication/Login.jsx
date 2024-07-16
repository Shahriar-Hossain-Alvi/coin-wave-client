import { useState } from "react";
import LoginWithEmail from "../components/LoginWithEmail/LoginWithEmail";
import LoginWithMobile from "../components/LoginWithMobile/LoginWithMobile";
import { Slide } from "react-awesome-reveal";


const Login = () => {
    const [loginMethod, setLoginMethod] = useState('email');

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

    const handleLogInWithEmail = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const pin = form.pin.value;

        const logInData = {
            email, pin
        }

        console.log(logInData);
    }


    return (
        <div className="bg-cwCream overflow-hidden pt-10">
            <div className="pt-10 text-center">
                <button onClick={() => setLoginMethod('email')} className={`btn ${loginMethod === 'email' ? 'bg-cwViolate border-cwViolate' : 'bg-transparent text-black border-cwViolate'}  text-white rounded-full rounded-r-none hover:bg-cwOrange hover:text-white`}>Email</button>

                <button onClick={() => setLoginMethod('mobile')} className={`btn ${loginMethod === 'mobile' ? 'bg-cwViolate border-cwViolate' : 'bg-transparent text-black border-cwViolate'} text-white rounded-full hover:bg-cwOrange rounded-l-none hover:text-white`}>Mobile number</button>
            </div>


            {
                loginMethod === 'email' ?
                    <Slide>
                        <LoginWithEmail handleLogInWithEmail={handleLogInWithEmail}></LoginWithEmail>
                    </Slide>
                    :
                    <Slide direction="right">
                        <LoginWithMobile handleLogInWithMobile={handleLogInWithMobile}></LoginWithMobile>
                    </Slide>
            }
        </div>
    );
};

export default Login;