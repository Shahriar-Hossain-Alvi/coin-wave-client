import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { CgMoreVertical } from "react-icons/cg";
import { Link } from "react-router-dom";


const AdminDashboardContent = () => {
    const axiosSecure = useAxiosSecure();

    const { data: adminPanelData = [], isLoading, isError, error } = useQuery({
        queryKey: ["adminPanelData"],
        queryFn: async () => {
            const res = await axiosSecure("/adminPanelData");
            return res.data;
        }
    });

    const { totalSentMoneyAmount, totalServiceChargeAmount, totalUser, recentTransactions, latestUsers } = adminPanelData;

    return (
        <div className="mb-10">
            {
                isError &&
                <span className="text-2xl font-semibold text-center text-red-500 my-5">{error.message}</span>
            }

            {
                isLoading ?
                    <LoadingSpinner />

                    :

                    <>
                        {/* show stats */}
                        <div className="flex flex-col md:flex-row gap-4 mb-10">
                            <div className="stats bg-cwOrange text-white text-center">
                                <div className="stat">
                                    <div className="font-semibold text-lg">Total Transactions</div>

                                    <div className="stat-value">৳{totalSentMoneyAmount} BDT</div>
                                </div>
                            </div>

                            <div className="stats bg-blue-500 text-white text-center">
                                <div className="stat">
                                    <div className="font-semibold text-lg">Total Service Charge</div>

                                    <div className="stat-value">৳{totalServiceChargeAmount} BDT</div>
                                </div>
                            </div>

                            <div className="stats bg-cwViolate text-white text-center">
                                <div className="stat">
                                    <div className="font-semibold text-lg">Users & Agents</div>

                                    <div className="stat-value">{totalUser}</div>
                                </div>
                            </div>
                        </div>


                        {/* show recent users and agents */}
                        <div className="mb-10">
                            <h2 className="text-2xl mb-2 font-semibold text-cwViolate">Recent Transactions</h2>
                            <div className="grid grid-cols-4 bg-cwViolate rounded-xl gap-2">
                                {
                                    latestUsers?.map(latestUser => <div className="text-white text-center py-3" key={latestUser._id}>

                                        <div className={`avatar ${latestUser.status === "active" ? "online" : "offline"} placeholder`}>
                                            <div className="bg-neutral w-16 rounded-full">
                                                <span className="text-xl capitalize font-bold">{latestUser?.name.slice(0, 1)}</span>
                                            </div>
                                        </div>

                                        <h1 className="text-xl my-2 font-semibold">{latestUser?.name}</h1>

                                        <h1 className="text-lg font-medium">{latestUser?.profileCreationTime.slice(0, 10)}</h1>
                                    </div>)
                                }
                                <Link to="/allUsers" className="flex flex-col text-white items-center justify-center py-3 cursor-pointer hover:bg-cwOrange transition-all ease-in-out duration-700 rounded-r-xl">
                                    <CgMoreVertical className="text-5xl flex-1" />
                                    <span className="text-lg font-semibold">See More</span>
                                </Link>
                            </div>
                        </div>


                        {/* show latest transactions */}
                        <div>
                            <h2 className="text-2xl mb-2 font-semibold text-cwViolate">Recent Transactions</h2>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Sender</th>
                                        <th>Receiver</th>
                                        <th>Sent Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        recentTransactions?.map(transaction => <tr className="hover" key={transaction._id}>
                                            <td>{transaction.senderName}</td>
                                            <td>{transaction.receiverName}</td>
                                            <td>{transaction.sentAmount}</td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>
            }
        </div>
    );
};

export default AdminDashboardContent;