import Sidebar from '../components/Shared/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const DashboardMain = () => {
    return (
        <div className="bg-cwCream font-raleway flex gap-1">
            <Sidebar></Sidebar>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashboardMain;