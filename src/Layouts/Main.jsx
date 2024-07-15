import { Outlet } from "react-router-dom";
import Sidebar from "../components/Shared/Sidebar/Sidebar"

const Main = () => {
    return (
        <div className="bg-cwCream font-raleway flex gap-1">
            <Sidebar></Sidebar>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Main;