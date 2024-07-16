import { IoMenu } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import "./Sidebar.css"

const Sidebar = () => {
    return (
        <div id="sidebar">
            {/* for large device */}
            <div className="hidden lg:block lg:w-44 bg-cwViolate text-white min-h-screen">
                <button className="btn btn-block bg-transparent text-white border-none hover:bg-transparent mt-2 shadow-none text-2xl mb-5 font-bold">Coin Wave</button>

                <ul className="menu">
                    <li>
                        <NavLink to='/'>Dashboard</NavLink>
                    </li>

                    <li>
                        <NavLink to='/transactions'>Transactions</NavLink>
                    </li>

                    <li>
                        <NavLink to='/cashIn'>Cash-in</NavLink>
                    </li>

                    <li>
                        <NavLink to='/cashOut'>Cash-out</NavLink>
                    </li>
                </ul>
            </div>


            {/* for small device */}
            <div className="w-10 lg:hidden drawer">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <label htmlFor="my-drawer-2" className="btn btn-sm bg-cwViolate hover:bg-cwViolate text-white drawer-button lg:hidden">
                    <IoMenu />
                </label>

                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>


                    <ul className="menu bg-cwViolate text-white min-h-full w-80 p-4">
                        {/* Sidebar content here */}
                        <li className="mt-2 font-bold text-xl mb-5">
                            <Link to='/'>
                                Coin Wave
                            </Link>
                        </li>

                        <li>
                            <NavLink to='/'>Dashboard</NavLink>
                        </li>

                        <li>
                            <NavLink to='/transactions'>Transactions</NavLink>
                        </li>

                        <li>
                            <NavLink to='/cashIn'>Cash-in</NavLink>
                        </li>

                        <li>
                            <NavLink to='/cashOut'>Cash-out</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;