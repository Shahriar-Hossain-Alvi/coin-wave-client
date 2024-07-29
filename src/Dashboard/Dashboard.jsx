import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    const { email, name, mobileNumber, balance } = user;

    return (
        <div className="min-h-screen lg:mx-10 mx-2">
            <Helmet>
                <title>Dashboard | CW</title>
            </Helmet>

            <h1 className="text-center mt-5 font-bold text-3xl text-cwViolate">Dashboard</h1>

            <div className="mt-10 flex">
                <div className="flex-1">
                    <h1 className="text-2xl font-bold">Name: <span className="font-semibold">{name}</span></h1>

                    <h4 className="text-2xl font-bold">Email address: <span className="font-semibold">{email}</span></h4>

                    <h4 className="text-2xl font-bold">Mobile number: <span className="font-semibold">{mobileNumber}</span></h4>
                </div>

                <button className="btn btn-lg bg-cwViolate text-white hover:bg-cwViolate no-animation font-sans">Balance: {balance}tk</button>
            </div>
        </div>
    );
};

export default Dashboard;