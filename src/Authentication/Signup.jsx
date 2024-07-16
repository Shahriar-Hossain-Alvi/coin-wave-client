import { useState } from "react";
import AgentSignUpForm from "../components/AgentSignUpForm/AgentSignUpForm";
import UserSignupForm from "../components/UserSignupForm/UserSignupForm";
import { Slide } from "react-awesome-reveal";

const Signup = () => {
    const [activeTab, setActiveTab] = useState('user');

    const handleUserSignUp = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const mobileNumber = form.mobileNumber.value;
        const email = form.email.value;
        const pin = form.pin.value;
        const role = "user";
        const status = "pending";

        const signUpData = {
            name, email, mobileNumber, pin, role, status
        }

        console.log(signUpData);
    }


    const handleAgentSignUp = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const mobileNumber = form.mobileNumber.value;
        const email = form.email.value;
        const pin = form.pin.value;
        const role = "agent";
        const status = "pending";

        const signUpData = {
            name, email, mobileNumber, pin, role, status
        }

        console.log(signUpData);
    }

    console.log(activeTab);

    return (
        <div className="bg-cwCream overflow-hidden">

            <div className="pt-10 text-center">
                <button onClick={() => setActiveTab('user')} className={`btn ${activeTab === 'user' ? 'bg-cwViolate border-cwViolate' : 'bg-transparent text-black border-cwViolate'}  text-white rounded-full rounded-r-none hover:bg-cwOrange hover:text-white`}>User Registration</button>

                <button onClick={() => setActiveTab('agent')} className={`btn ${activeTab === 'agent' ? 'bg-cwViolate border-cwViolate' : 'bg-transparent text-black border-cwViolate'} text-white rounded-full hover:bg-cwOrange rounded-l-none hover:text-white`}>Agent Registration</button>
            </div>


            {
                activeTab === 'user' ?
                    <Slide>
                        <UserSignupForm handleUserSignUp={handleUserSignUp}></UserSignupForm>
                    </Slide>
                    :
                    <Slide direction="right">
                        <AgentSignUpForm handleAgentSignUp={handleAgentSignUp}></AgentSignUpForm>
                    </Slide>
            }



        </div>
    );
};

export default Signup;