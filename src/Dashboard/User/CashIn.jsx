import { Helmet } from "react-helmet-async";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import Marquee from "react-fast-marquee";

const CashIn = () => {

    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Cash In | Coin Wave</title>
            </Helmet>

            <SectionHeading title={'Cash in Request'} />

            <div className="text-red-500 font-sans font-medium max-w-xs md:max-w-lg lg:max-w-2xl mx-auto">
                <Marquee
                    pauseOnHover={true}
                >
                    <h1 className="mx-5">*Give transaction amount and select an agent to request a cash in*</h1>

                    <h1 className="mx-5">*Minimum cash in amount <span className="font-bold underline">50 taka</span>*</h1>
                </Marquee>
            </div>



            <div>
                <form className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Enter Amount</span>
                        </label>
                        <input type="number" placeholder="Amount" className="input input-bordered" required />
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Request</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CashIn;