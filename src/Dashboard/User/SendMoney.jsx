import { Helmet } from "react-helmet-async";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Marquee from "react-fast-marquee";

const SendMoney = () => {
    const { user } = useContext(AuthContext);
    const [receiver, setReceiver] = useState([]);
    const axiosSecure = useAxiosSecure();

    const searchReceiver = async e => {
        e.preventDefault();
        const form = e.target;
        const senderNumber = user.mobileNumber;
        const receiverNumber = form.receiverNumber.value;
        const res = await axiosSecure.get(`/receiverInfo?receiverNumber=${receiverNumber}&&senderNumber=${senderNumber}`);

        if (res.data.message === 'same number') {
            Swal.fire({
                title: "Check the number",
                text: "You cannot send money to the same number as yours",
                icon: "error"
            });
        }

        if (res.data.message === "not found") {
            Swal.fire({
                title: "Receiver not found",
                text: "Enter the correct number or ask the receiver if they have an account with us.",
                icon: "error"
            });
        }

        setReceiver(res.data);
        form.reset();
    }

    console.log(receiver);

    return (
        <div className="min-h-screen">

            <Helmet>
                <title>Send Money | Coin Wave</title>
            </Helmet>

            <SectionHeading title={'Send Money'} />

            <Marquee>
                <div className="flex gap-10 font-medium text-red-600 font-sans">
                    <h1>*Minimum Transaction limit 50 taka*</h1>
                    <h1>*A fee of 5 taka will be charged on send money over 100 taka*</h1>
                </div>
            </Marquee>


            {/* Search for a valid receiver with phone number */}
            <div className="mt-5">
                <label className="label">
                    <span className="label-text font-semibold text-lg">Search Receiver</span>
                </label>


                {/* search for receiver */}
                <form onSubmit={searchReceiver} className="flex gap-2">
                    <input name="receiverNumber" type="number" placeholder="Enter Receiver Number" className="input w-full input-bordered inline" required />

                    <input type="submit" value="Search" className="btn bg-cwViolate text-white hover:bg-cwOrange" />
                </form>
            </div>


            <div className="flex justify-between gap-4 items-center font-sans mt-10">

                {/* enter send money amount */}
                <div className="w-3/4">
                    <label className="label">
                        <span className="label-text font-semibold text-lg">Enter Amount</span>
                    </label>
                    <input name="sendMoney" type="number" placeholder="Enter amount" className="input w-full input-bordered" required />
                </div>

                {/* show current balance */}
                <div className="w-1/4">
                    <label className="label">
                        <span className="label-text font-semibold text-lg">Current Balance</span>
                    </label>
                    <button className="btn bg-success text-white w-full text-xl hover:bg-success no-animation font-sans">{user.balance}tk</button>
                </div>
            </div>

        </div>
    );
};

export default SendMoney;