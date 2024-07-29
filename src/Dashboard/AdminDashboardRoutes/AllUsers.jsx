import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import TableRows from "../../components/TableRows/TableRows";

const AllUsers = () => {
    const axiosPublic = useAxiosPublic();

    const { data: allUsers = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allUsers');
            return res.data;
        }
    });

    console.log(allUsers);

    return (
        <div className="min-h-screen mt-10">
            <h1 className="text-center mt-5 font-bold text-3xl text-cwViolate">Users List</h1>

            <h2 className="font-medium mt-3 ml-1 font-sans text-xl">Total number of users & agents: {allUsers.length}</h2>

            <div>
                {
                    isError &&
                    <p className="text-2xl font-semibold text-center text-red-500 my-5">{error.message}</p>
                }

                {
                    isLoading &&
                    <LoadingSpinner />
                }
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>email</th>
                            <th>Role</th>
                            <th>Account Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            allUsers.map((singleUser, index) => <TableRows key={singleUser._id} index={index} singleUser={singleUser} />)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;