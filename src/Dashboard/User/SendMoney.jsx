import { Helmet } from "react-helmet-async";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Marquee from "react-fast-marquee";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const SendMoney = () => {
    // todo add the sentAmount to the receivers account

    const { user, setUser } = useContext(AuthContext);
    const [receiver, setReceiver] = useState([]);
    const axiosSecure = useAxiosSecure();
    const [amountError, setAmountError] = useState('');
    const [pinError, setPinError] = useState('');
    const { name, email, mobileNumber } = receiver;
    const [sendMoneyLoading, setSendMoneyLoading] = useState(false);

    // function to search the receiver
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
            form.reset();
            setReceiver([]);
            return;
        }

        if (res.data.message === "not found") {
            Swal.fire({
                title: "Receiver not found",
                text: "Enter the correct number or ask the receiver if they have an account with us.",
                icon: "error"
            });
            setReceiver([]);
            form.reset();
            return;
        }

        setReceiver(res.data);
        form.reset();
    }

    // function to send money
    const handleSendMoney = async e => {
        e.preventDefault();
        const form = e.target;

        // sender info
        const senderName = user.name;
        const senderEmail = user.email;
        const senderMobileNumber = user.mobileNumber;

        // receiver info
        const receiverName = form.receiverName.value;
        const receiverEmail = form.receiverEmail.value;
        const receiverMobileNumber = form.receiverMobileNumber.value;

        const sentAmount = parseInt(form.sendMoneyAmount.value);
        const pin = form.pin.value;

        // show error if the sending amount is bigger than the current balance
        if (sentAmount > user.balance || sentAmount < 50) {
            setAmountError('Insufficient Balance');
            return;
        }
        setAmountError('');

        //show error if the pin is not 5 digits
        if (pin.length !== 5) {
            setPinError('Wrong PIN');
            return;
        }
        setPinError('');



        const sendMoneyInfo = {
            senderName, senderEmail, senderMobileNumber,
            receiverName, receiverEmail, receiverMobileNumber,
            sentAmount, pin
        }


        setSendMoneyLoading(true);
        const res = await axiosSecure.post('/sendMoney', sendMoneyInfo);

        //show alert for wrong pin number
        if (res.data.message === "Incorrect PIN number") {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Transaction failed",
                text: "Provide correct pin number",
                showConfirmButton: false,
                timer: 1500
            });
        }

        //update the amount in the receivers account upon successful transaction
        if (res.data.insertedId) {
            const result = await axiosSecure.patch("/updateReceiversBalance", { sentAmount, receiverEmail });

            if (result.data.modifiedCount > 0) {
                setSendMoneyLoading(false);
                form.reset();
                setReceiver([]);

                // Update user balance in local storage and state
                const newBalance = user.balance - sentAmount - (sentAmount > 100 ? 5 : 0);
                user.balance = newBalance;
                localStorage.setItem('userInfo', JSON.stringify(user));
                setUser(user);

                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Transaction Successful",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }


    return (
        <div className="min-h-screen lg:mx-5 mx-2">

            <Helmet>
                <title>Send Money | Coin Wave</title>
            </Helmet>

            <SectionHeading title={'Send Money'} />

            <div className="text-red-500 font-sans font-medium max-w-xs md:max-w-lg lg:max-w-2xl mx-auto">
                <Marquee
                    pauseOnHover={true}
                >
                    <h1 className="mx-5">*Minimum Transaction limit <span className="font-bold underline">50 taka</span>*</h1>

                    <h1 className="mx-5">*A fee of <span className="font-bold underline">5 taka</span> will be charged on send money over <span className="font-bold underline">100 taka</span>*</h1>

                    <h1 className="mx-5">*Check the receivers current <span className="font-bold underline">account status</span> before sending money*</h1>
                </Marquee>
            </div>


            {/* Search for a valid receiver with phone number */}
            <div className="mt-5">
                <label className="label">
                    <span className="label-text font-semibold text-lg">Search Receiver</span>
                </label>


                {/* search for receiver */}
                <form onSubmit={searchReceiver} className="flex flex-row gap-2">
                    <input name="receiverNumber" type="number" placeholder="Enter Receiver Number" className="input input-bordered w-full" required />

                    <input type="submit" value="Search" className="btn bg-cwViolate  text-white hover:bg-cwOrange" />
                </form>
            </div>


            {/* Display Receiver information */}
            {
                receiver.length !== 0 &&
                <div className="text-center mt-10 mb-10">
                    <h3 className="font-semibold text-2xl">Receivers Information</h3>

                    <form onSubmit={handleSendMoney} className="w-full font-sans">

                        {/* name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold text-lg">Name</span>
                            </label>
                            <input name="receiverName" type="text" placeholder="Receivers name will appear here"
                                value={name ? name : ''} className="input input-bordered font-semibold" readOnly />
                        </div>

                        {/* email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold text-lg">Email</span>
                            </label>
                            <input name="receiverEmail" type="email" placeholder="Receivers email address will appear here"
                                value={email ? email : ''} className="input input-bordered font-semibold" readOnly />
                        </div>

                        {/* mobile number */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold text-lg">Mobile Number</span>
                            </label>
                            <input name="receiverMobileNumber" type="number" placeholder="Receivers mobile number will appear here"
                                value={mobileNumber ? mobileNumber : ''} className="input input-bordered font-semibold" readOnly />
                        </div>


                        {/* Enter money amount */}
                        <div className="flex flex-row justify-between gap-4 items-center">
                            <div className="w-1/2 md:w-3/4 form-control">
                                <label className="label">
                                    <span className="label-text font-semibold text-lg">Enter Amount
                                    </span>
                                </label>
                                <input name="sendMoneyAmount" type="number" placeholder="Enter amount" className="input w-full input-bordered" required />
                                <span className="text-red-500">{amountError}</span>
                            </div>

                            {/* show current balance */}
                            <div className="w-1/2 md:w-1/4">
                                <label className="label">
                                    <span className="label-text font-semibold text-lg">Current Balance</span>
                                </label>
                                {
                                    user.balance < 50 ?
                                        <button type="button" className="btn bg-error text-white w-full text-xl hover:bg-error no-animation font-sans">{user.balance}tk</button>
                                        :
                                        <button type="button" className="btn bg-success text-white w-full text-xl hover:bg-success no-animation font-sans">{user.balance}tk</button>
                                }
                            </div>
                        </div>


                        {/* enter pin number */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">PIN</span>
                            </label>
                            <input name="pin" type="password" placeholder="Enter you pin number" className="input input-bordered" required />
                            <span className="text-red-500">{pinError}</span>
                        </div>
                        <div className="form-control mt-6">
                            {
                                sendMoneyLoading ?
                                    <button disabled className="btn bg-cwViolate text-white hover:bg-cwOrange"><LoadingSpinner /></button>
                                    :
                                    <button className="btn bg-cwViolate text-white hover:bg-cwOrange">SEND</button>
                            }
                        </div>
                    </form>
                </div>
            }
        </div>
    );
};

export default SendMoney;