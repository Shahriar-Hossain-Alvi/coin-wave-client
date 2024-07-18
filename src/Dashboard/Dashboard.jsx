import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";


const Dashboard = () => {
    const { user } = useContext(AuthContext);

    console.log(user);

    return (
        <div>
            This is dashboard
        </div>
    );
};

export default Dashboard;