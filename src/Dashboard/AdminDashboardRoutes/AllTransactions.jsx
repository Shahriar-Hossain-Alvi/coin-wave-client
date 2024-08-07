import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import AllTransactionTableRow from "../../components/AllTransactionTableRow/AllTransactionTableRow";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import { Helmet } from "react-helmet-async";


const AllTransactions = () => {
    const axiosSecure = useAxiosSecure();

    const { data: allTransactions = [], isLoading, isError, error } = useQuery({
        queryKey: ['allTransactions'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allTransactions');
            return res.data;
        }
    });


    return (
        <div className="min-h-screen mx-2 lg:mx-10">
            <Helmet>
                <title>All Transaction | Coin wave</title>
            </Helmet>

            <SectionHeading title={'All Transactions'} />

            {
                isError &&
                <span className="text-2xl font-semibold text-center text-red-500 my-5">{error.message}</span>
            }

            {
                isLoading ?
                    <LoadingSpinner />
                    :
                    <div className="overflow-x-auto">
                        <table className="table table-xs md:table-md lg:table-lg">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>SL</th>
                                    <th>Sender</th>
                                    <th>Receiver</th>
                                    <th>Amount</th>
                                    <th>Tnx ID</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allTransactions.map((singleTransaction, index) => <AllTransactionTableRow
                                        key={singleTransaction._id}
                                        index={index}
                                        singleTransaction={singleTransaction}
                                    />)
                                }
                            </tbody>
                        </table>
                    </div>
            }


        </div>
    );
};

export default AllTransactions;