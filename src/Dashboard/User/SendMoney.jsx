import { Helmet } from "react-helmet-async";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

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

        if(res.data.message === "not found"){
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

            <div className="flex justify-between gap-4 items-center font-sans mb-5">

                {/* enter send money amount */}
                <div className="w-3/4">
                    <label className="label">
                        <span className="label-text font-semibold text-lg">Enter Amount (MINIMUM 50TK)</span>
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


            {/* Enter receiver phone number */}
            <div>
                <label className="label">
                    <span className="label-text font-semibold text-lg">Search Receiver</span>
                </label>


                <form onSubmit={searchReceiver} className="flex gap-2">
                    <input name="receiverNumber" type="number" placeholder="Enter Receiver Number" className="input w-full input-bordered inline" required />

                    <input type="submit" value="Search" className="btn bg-cwViolate text-white hover:bg-cwOrange" />
                </form>
            </div>

        </div>
    );
};

export default SendMoney;