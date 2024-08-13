import { useContext, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import loadingAnimation from "../../assets/Animations/LoadingAnimation.json";
import Lottie from "react-lottie";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import Marquee from "react-fast-marquee";

const CashOut = () => {
    const [agentNameError, setAgentNameError] = useState('');
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const { data: agentsList = [], isLoading, isError, error } = useQuery({
        queryKey: ['agentsList'],
        queryFn: async () => {
            const res = await axiosSecure.get('/agentsList');
            return res.data;
        }
    });

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    if (isLoading) {
        return <Lottie options={defaultOptions}
            height={500}
            width={500}
        />
    }

    //function to send cash in request data to the server
    const handleCashOut = async e => {
        e.preventDefault();
        const form = e.target;

        if (user) {
            const cashOutAmount = parseInt(form.cashOutAmount.value);
            if (cashOutAmount < 50) {
                Swal.fire({
                    position: "top-end",
                    icon: "warning",
                    title: "Minimum cash out limit is 50 tk",
                    showConfirmButton: false,
                    timer: 1500
                });
                return;
            }
            const agentName = form.agentName.value;

            if (agentName === 'Click to Extend the list') {
                setAgentNameError('Select an agent from the list');
                return;
            }
            setAgentNameError('');



            //get agent info
            const agentDetails = agentsList.find(a => agentName === a.name);

            const agentEmail = agentDetails?.email;
            const agentMobileNumber = agentDetails?.mobileNumber;


            // get user info
            const userName = user?.name;
            const userEmail = user?.email;
            const userMobileNumber = user?.mobileNumber;

            // send cash in info to server side
            const cashOutRequestInfo = {
                userName, userEmail, userMobileNumber, agentName, agentEmail, agentMobileNumber, cashOutAmount
            }

            const res = await axiosSecure.post('/cashOutRequest', cashOutRequestInfo);
            if (res.data.message === 'successful') {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Request successful",
                    showConfirmButton: false,
                    timer: 1500
                });
                form.reset();
            }
        }

    }



    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Cash Out | Coin Wave</title>
            </Helmet>

            <SectionHeading title={'Cash out Request'} />

            <div className="text-red-500 font-sans font-medium max-w-xs md:max-w-lg lg:max-w-2xl mx-auto">
                <Marquee
                    pauseOnHover={true}
                >
                    <h1 className="mx-5">*Give transaction amount and select an agent to request a cash out*</h1>

                    <h1 className="mx-5">*Minimum cash out amount <span className="font-bold underline">50 taka</span>*</h1>


                    <h1 className="mx-5">*Cash out charge is <span className="font-bold underline">1.5%</span>*</h1>
                </Marquee>
            </div>

            {
                isError && <span className="text-2xl font-semibold text-center text-red-500 my-5">{error.message}</span>
            }

            <div>
                <form onSubmit={handleCashOut} className="card-body font-sans font-medium">

                    {/* enter amount */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Enter Amount</span>
                        </label>
                        <input name="cashOutAmount" type="number" placeholder="Amount" className="input input-bordered" required />
                    </div>


                    {/* select agent */}
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Select an Agent from the list</span>
                        </div>
                        <select name="agentName" className="select select-bordered">
                            <option defaultValue >Click to Extend the list</option>
                            {
                                agentsList?.map(singleAgent => <option key={singleAgent._id}>{singleAgent.name}</option>)
                            }
                        </select>
                        {
                            agentNameError !== '' &&
                            <span className="font-semibold text-red-500">{agentNameError}</span>
                        }
                    </label>


                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Request</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CashOut;