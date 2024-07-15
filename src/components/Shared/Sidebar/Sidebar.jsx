import { IoMenu } from "react-icons/io5";

const Sidebar = () => {
    return (
        <div>
            {/* for large device */}
            <div className="hidden lg:block lg:w-44 bg-cwViolate text-white min-h-screen">
                <ul>
                    <li>HOme</li>
                    <li>HOme</li>
                    <li>HOme</li>
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
                        <li><a>Sidebar Item 1</a></li>
                        <li><a>Sidebar Item 2</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;