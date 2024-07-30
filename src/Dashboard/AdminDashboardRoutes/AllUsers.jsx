import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import TableRows from "../../components/TableRows/TableRows";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: allUsers = [], isLoading, isError, error } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allUsers');
            return res.data;
        }
    });

    const handleUserApprove = id => {
        console.log('approved', id);
        const status = 'active';
    }

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
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            allUsers.map((singleUser, index) => <TableRows 
                            key={singleUser._id} 
                            index={index} 
                            singleUser={singleUser}
                            handleUserApprove={handleUserApprove}
                            />)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;