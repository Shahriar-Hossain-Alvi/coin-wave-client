import { Helmet } from "react-helmet-async";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Swal from "sweetalert2";
import CashOutRequestTableRow from "../../components/CashOutRequestTableRow/CashOutRequestTableRow";



const CashOutRequest = () => {
    const axiosSecure = useAxiosSecure();
    const { user, setUser } = useContext(AuthContext);
    const agentsEmailAddress = user.email;

    //fetch cash out request data
    const { data: cashOutRequestData = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ['cashOutRequestData'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/cashOutRequests?agentEmail=${agentsEmailAddress}`);
            return res.data;
        },
        enabled: !!agentsEmailAddress
    })


    // accept cash out request
    const acceptCashOutRequest = async (id, userEmail, agentEmail, cashOutAmount) => {
        const cashOutId = id;
        const cashOutRequestStatus = 'accepted';

        const cashOutAmountWithCharge = parseFloat(cashOutAmount + (cashOutAmount * 0.015));


        // update status in the cash out collection
        const res = await axiosSecure.patch('/cashOutRequests', { cashOutId, cashOutRequestStatus });

        if (res.data.modifiedCount > 0) {

            //update users and agents balance in the users collection 
            const updateTheBalance = await axiosSecure.patch('/updateUserAndAgentBalanceAfterCashOut', { userEmail, agentEmail, cashOutAmountWithCharge });

            if (updateTheBalance.data.success === true) {
                // Update user balance in local storage and state
                const newBalance = user.balance + cashOutAmountWithCharge;
                user.balance = newBalance;
                localStorage.setItem('userInfo', JSON.stringify(user));
                setUser(user);

                Swal.fire({
                    position: "top-start",
                    icon: "success",
                    title: "Cash Out successful",
                    showConfirmButton: false,
                    timer: 1000
                });
                refetch();
            }


        }

    }


    // reject cash in request
    const rejectCashOutRequest = async (id) => {
        console.log('rejected', id);
        const cashOutId = id;
        const cashOutRequestStatus = 'rejected';

        const res = await axiosSecure.patch('/cashOutRequests', { cashOutId, cashOutRequestStatus })
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                position: "top-start",
                icon: "success",
                title: "Cash out rejected",
                showConfirmButton: false,
                timer: 1000
            });
            refetch();
        }
    }


    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Cash Out Requests | Coin Wave</title>
            </Helmet>

            <SectionHeading title={'Cash out requests'} />

            {
                isError && <span className="text-2xl font-semibold text-center text-red-500 my-5">{error.message}</span>
            }

            {
                isLoading ?
                    <LoadingSpinner />
                    :
                    <div className="overflow-x-auto">
                        <table className="table text-center font-medium font-sans">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Sl</th>
                                    <th>Name</th>
                                    <th>Mobile Number</th>
                                    <th>Amount</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cashOutRequestData?.map((cashOutData, index) => <CashOutRequestTableRow
                                        key={cashOutData._id}
                                        cashOutData={cashOutData}
                                        index={index}
                                        acceptCashOutRequest={acceptCashOutRequest}
                                        rejectCashOutRequest={rejectCashOutRequest}
                                    />)
                                }
                            </tbody>
                        </table>
                    </div>
            }

        </div>
    );
};

export default CashOutRequest;


