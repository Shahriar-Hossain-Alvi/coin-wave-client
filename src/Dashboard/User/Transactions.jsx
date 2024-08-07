import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import { Helmet } from "react-helmet-async";
import UserTransactionTableRow from "../../components/UserTransactionTableRow/UserTransactionTableRow";


const Transactions = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const email = user?.email;

    const { data: userTransactions = [], isLoading, isError, error } = useQuery({
        queryKey: ['userTransactions'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/usersTransaction/${email}`);
            return res.data;
        }
    });


    return (
        <div className="min-h-screen lg:mx-10 mx-2">
            <Helmet>
                <title>Transactions | Coin Wave</title>
            </Helmet>

            <SectionHeading title={'Transactions'} />

            <div>
                <h1 className="text-center mb-10 font-medium text-xl">Here is the list of all the Transactions you have made</h1>


                {/* show error message */}
                {
                    isError && <span>{error.message}</span>
                }


                {/* Transaction list */}
                {
                    isLoading ? <LoadingSpinner />
                        :
                        <div className="overflow-x-auto">
                            <table className="table table-xs md:table-md font-sans">
                                <thead>
                                    <tr>
                                        <th>SL</th>
                                        <th>Receiver</th>
                                        <th>Number</th>
                                        <th>Transaction ID</th>
                                        <th>Amount</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        userTransactions.map((transaction, index) => <UserTransactionTableRow key={transaction._id}
                                            index={index}
                                            transaction={transaction}
                                        />)
                                    }
                                </tbody>
                            </table>
                        </div>
                }
            </div>

        </div>
    );
};

export default Transactions;