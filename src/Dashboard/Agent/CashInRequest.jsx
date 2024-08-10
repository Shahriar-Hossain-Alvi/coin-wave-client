import { Helmet } from "react-helmet-async";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import CashInRequestTableRow from "../../components/CashInRequestTableRow/CashInRequestTableRow";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Swal from "sweetalert2";


const CashInRequest = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const agentsEmailAddress = user.email;

    //fetch cash in request data
    const { data: cashInRequestData = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ['cashInRequestData'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/cashInRequests?agentEmail=${agentsEmailAddress}`);
            return res.data;
        },
        enabled: !!agentsEmailAddress
    })


    // handle accept or reject
    const acceptCashInRequest = async (id) => {
        console.log('accepted', id);
        const cashInId = id;
        const cashInRequestStatus = 'accepted';
        const res = await axiosSecure.patch('/cashInRequests', { cashInId, cashInRequestStatus })
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                position: "top-start",
                icon: "success",
                title: "Cash In successful",
                showConfirmButton: false,
                timer: 1000
            });
            refetch();
        }

    }

    const rejectCashInRequest = async (id) => {
        console.log('rejected', id);
        const cashInId = id;
        const cashInRequestStatus = 'rejected';

        const res = await axiosSecure.patch('/cashInRequests', { cashInId, cashInRequestStatus })
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                position: "top-start",
                icon: "success",
                title: "Cash In rejected",
                showConfirmButton: false,
                timer: 1000
            });
            refetch();
        }
    }


    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Cash In Requests | Coin Wave</title>
            </Helmet>

            <SectionHeading title={'Cash in requests'} />

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
                                    cashInRequestData?.map((cashInData, index) => <CashInRequestTableRow
                                        key={cashInData._id}
                                        cashInData={cashInData}
                                        index={index}
                                        acceptCashInRequest={acceptCashInRequest}
                                        rejectCashInRequest={rejectCashInRequest}
                                    />)
                                }
                            </tbody>
                        </table>
                    </div>
            }

        </div>
    );
};

export default CashInRequest;