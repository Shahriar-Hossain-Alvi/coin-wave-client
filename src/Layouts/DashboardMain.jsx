import Sidebar from '../components/Shared/Sidebar/Sidebar';
import { Outlet, ScrollRestoration } from 'react-router-dom';

const DashboardMain = () => {
    return (
        <div className="font-raleway flex gap-1 ">
            <ScrollRestoration />
            <Sidebar></Sidebar>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashboardMain;